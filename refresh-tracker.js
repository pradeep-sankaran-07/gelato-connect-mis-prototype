#!/usr/bin/env node
// refresh-tracker.js — Pull Jira data, make PM assessments, update MIS tracker HTML
// Runs every 4 hours via GitHub Actions or local cron

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ─── Configuration ───
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_BASE_URL =
  process.env.JIRA_BASE_URL || "https://gelato.atlassian.net";
const GITHUB_REPO =
  process.env.GITHUB_REPO || "gelatoas/connect-mis-prototype";
const TRACKER_PATH = "docs/tracker/index.html";
const DRY_RUN = process.env.DRY_RUN === "true";

// ─── Work Stream Definitions ───
const WORKSTREAM_DEFS = [
  {
    id: "cross",
    name: "Cross-cutting: Quote-to-Order",
    owner: "Paul",
    ownerFull: "Paul (Tech Lead)",
    team: "Cross-team",
    deadline: "2026-04-10",
    epicKeys: ["MIS-20"],
  },
  {
    id: "ws1a",
    name: "WS1a: Quote-to-Order, Job Ticketing, Post-Conversion Order Editing, Reprints",
    owner: "Styrbjorn",
    ownerFull: "Styrbjorn",
    team: "AI estimator team",
    deadline: "2026-04-24",
    epicKeys: ["JBW-4274"],
  },
  {
    id: "ws1b",
    name: "WS1b: File Receipt & Proofing, Customer Communication Triggers",
    owner: "Nilesh",
    ownerFull: "Nilesh",
    team: "GCWB team",
    deadline: "2026-04-30",
    epicKeys: ["GCWB-2477"],
  },
  {
    id: "ws2",
    name: "WS2: Production Tracking, Station Views, Outsourcing",
    owner: "Felix",
    ownerFull: "Felix",
    team: "GNX team",
    deadline: "2026-04-17",
    epicKeys: ["GNX-8466"],
  },
  {
    id: "ws3a",
    name: "WS3a: Shipping & Fulfillment",
    owner: "Kian",
    ownerFull: "Kian",
    team: "GCL team",
    deadline: "2026-04-24",
    epicKeys: ["GCL-3147"],
  },
  {
    id: "ws3b",
    name: "WS3b: Inventory & Procurement",
    owner: "Vipul",
    ownerFull: "Vipul",
    team: "GCP team",
    deadline: "2026-04-24",
    epicKeys: ["GCP-3695", "GCP-3740"],
  },
  {
    id: "ws4",
    name: "WS4: Finance, Invoicing, Customer CRM, ERP Integration",
    owner: "Felix",
    ownerFull: "Felix",
    team: "GNX team",
    deadline: "2026-04-24",
    epicKeys: ["GNX-8530"],
  },
];

// ─── Project Milestones ───
const MILESTONES = [
  { name: "E2E PoC + Prototypes", date: "2026-04-10" },
  { name: "50% Core Features", date: "2026-04-17" },
  { name: "100% Core + Pilot Testing", date: "2026-04-24" },
  { name: "Go-Live (11 Customers)", date: "2026-05-01" },
];

// ─── Project Context (from PRD & Development Plan) ───
// This drives PM-quality assessments beyond mechanical status counting.
const PROJECT_CONTEXT = {
  // Business stakes: $850K+ in signed MIS deals, 11 customers going live May 1
  goLiveDate: "2026-05-01",
  signedDeals: "$850K+",
  signedCustomers: 11,

  // Dependency chain: upstream must deliver before downstream can ship
  // Key: work stream id → array of upstream dependency ids
  dependencies: {
    cross: [],
    ws1a: ["cross"],
    ws1b: ["cross"],
    ws2: ["ws1a", "ws1b"],
    ws3a: ["ws2"],
    ws3b: ["ws2"],
    ws4: ["ws1a", "ws1b", "ws2", "ws3a", "ws3b"],
  },

  // Phase 1 scope per work stream — what MUST ship by May 1
  scope: {
    cross: "Quote-to-order E2E flow: API contracts, auth, estimation, quote persistence, order creation",
    ws1a: "Estimation configurator: categories, products, machines, pricing rules, estimation API. Blocks all downstream quoting.",
    ws1b: "Widget SDK: product selection, quantity inputs, real-time pricing, quote builder, theming, file receipt & proofing triggers",
    ws2: "Production tracking UI: estimation page, category browser, spec forms, price breakdown, quote flow. Station views with 99.9% uptime.",
    ws3a: "Order management: quote-to-order conversion, status tracking, modification workflow, approval process, shipping with manual lookup tables",
    ws3b: "Production planning engine + monitoring: scheduling, capacity, materials, bottleneck detection, real-time tracking, alerts",
    ws4: "Invoicing & billing: generation, templates, tax calc, payment tracking, credit notes, approval workflow, ERP integration (QuickBooks/Dynamics/Sage)",
  },

  // Key acceptance criteria thresholds from PRD
  acceptanceCriteria: {
    quoteToOrderConversion: "< 5 seconds",
    pageLoads: "< 2 seconds",
    statusUpdatePropagation: "< 1 second",
    labelGeneration: "< 30 seconds",
    invoiceGeneration: "< 5 seconds",
    fileUpload: "500MB with progress",
    coreActionsMaxClicks: 3,
    stationViewUptime: "99.9%",
    noITExpertiseRequired: true,
  },

  // ICP constraints: PSPs with EUR 300K-5M revenue, no dedicated IT staff
  icpConstraint: "All core features must be configurable by non-technical print shop admin without IT support. Simplicity trumps everything.",
};

// ─── Status Weight Map ───
const STATUS_WEIGHTS = {
  Done: 100,
  "On Staging": 80,
  "In Review": 60,
  "In Progress": 30,
  Selected: 10,
  Backlog: 0,
};

// ─── Jira API ───
async function jiraFetch(endpoint, params = {}) {
  const url = new URL(`${JIRA_BASE_URL}/rest/api/3/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString(
    "base64"
  );
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jira API ${res.status}: ${body}`);
  }
  return res.json();
}

async function fetchStoriesForEpic(epicKey) {
  const jql = `"Epic Link" = ${epicKey} ORDER BY key ASC`;
  const fields = "key,summary,status,duedate,assignee";
  let allIssues = [];
  let startAt = 0;
  const maxResults = 100;

  while (true) {
    const data = await jiraFetch("search", {
      jql,
      fields,
      startAt: String(startAt),
      maxResults: String(maxResults),
    });
    allIssues = allIssues.concat(data.issues || []);
    if (startAt + maxResults >= data.total) break;
    startAt += maxResults;
  }

  return allIssues.map((issue) => {
    // Extract first name only from assignee displayName
    const fullName = issue.fields.assignee?.displayName || null;
    const assignee = fullName ? fullName.split(" ")[0] : null;
    return {
      key: issue.key,
      summary: issue.fields.summary,
      assignee,
      status: issue.fields.status?.name || "Backlog",
      dueDate: issue.fields.duedate || null,
    };
  });
}

async function fetchEpicDetails(epicKey) {
  const data = await jiraFetch(`issue/${epicKey}`, {
    fields: "summary,status,duedate",
  });
  return {
    key: epicKey,
    summary: data.fields.summary,
    status: data.fields.status?.name || "Backlog",
    dueDate: data.fields.duedate || null,
  };
}

// ─── PM Assessment Logic ───
function calculateProgress(stories) {
  if (stories.length === 0) return 0;
  const totalWeight = stories.reduce((sum, s) => {
    const w = STATUS_WEIGHTS[s.status];
    return sum + (w !== undefined ? w : 0);
  }, 0);
  return Math.round(totalWeight / stories.length);
}

function countByStatus(stories) {
  const counts = {};
  for (const s of stories) {
    counts[s.status] = (counts[s.status] || 0) + 1;
  }
  return counts;
}

function daysUntil(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function formatDeadline(dateStr) {
  const d = new Date(dateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

// assessWorkStream now takes assessedMap (id→status) for dependency checking
function assessWorkStream(ws, stories, progress, assessedMap) {
  const total = stories.length;
  const counts = countByStatus(stories);
  const done = counts["Done"] || 0;
  const onStaging = counts["On Staging"] || 0;
  const inReview = counts["In Review"] || 0;
  const inProgress = counts["In Progress"] || 0;
  const selected = counts["Selected"] || 0;
  const backlog = counts["Backlog"] || 0;

  const daysLeft = daysUntil(ws.deadline);
  const deadlineStr = formatDeadline(ws.deadline);
  const backlogRatio = total > 0 ? backlog / total : 1;

  // Check for missing due dates
  const storiesWithoutDueDate = stories.filter((s) => !s.dueDate).length;
  const missingDueDates = storiesWithoutDueDate > total * 0.5;

  // Check for past-due stories
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const pastDue = stories.filter(
    (s) => s.dueDate && new Date(s.dueDate) < now && s.status !== "Done"
  ).length;

  // Check upstream dependency health
  const deps = PROJECT_CONTEXT.dependencies[ws.id] || [];
  const blockedUpstream = deps.filter(
    (depId) => assessedMap[depId] === "OFF_TRACK" || assessedMap[depId] === "BEHIND"
  );
  const upstreamOffTrack = deps.filter((depId) => assessedMap[depId] === "OFF_TRACK");

  // ─── Status Decision Matrix ───
  let status;

  if (
    (progress < 15 && daysLeft <= 14) ||
    (backlogRatio >= 0.85 && daysLeft <= 21) ||
    (progress === 0 && total > 0)
  ) {
    status = "OFF_TRACK";
  } else if (
    (progress < 40 && daysLeft <= 14) ||
    (backlogRatio > 0.6 && daysLeft <= 21) ||
    pastDue > total * 0.3
  ) {
    status = "BEHIND";
  } else if (
    (progress >= 20 && progress < 40 && daysLeft > 14) ||
    (pastDue > 0 && pastDue <= total * 0.3) ||
    (missingDueDates && daysLeft <= 21)
  ) {
    status = "AT_RISK";
  } else {
    status = "ON_TRACK";
  }

  // Upstream dependency escalation: if an upstream WS is off-track/behind,
  // this WS cannot be better than AT_RISK regardless of own metrics
  if (upstreamOffTrack.length > 0 && status === "ON_TRACK") {
    status = "AT_RISK";
  } else if (blockedUpstream.length > 0 && status === "ON_TRACK") {
    status = "AT_RISK";
  }

  // ─── Reason Text ───
  const parts = [];

  // Deadline context
  if (daysLeft < 0) {
    parts.push(`Past due (was ${deadlineStr}).`);
  } else if (daysLeft === 0) {
    parts.push(`Due today (${deadlineStr}).`);
  } else if (daysLeft === 1) {
    parts.push(`Due tomorrow (${deadlineStr}).`);
  } else {
    parts.push(`Due ${deadlineStr} \u2014 ${daysLeft} days left.`);
  }

  // Story breakdown
  const breakdown = [];
  if (done > 0) breakdown.push(`${done} done`);
  if (onStaging > 0) breakdown.push(`${onStaging} on staging`);
  if (inReview > 0) breakdown.push(`${inReview} in review`);
  if (inProgress > 0) breakdown.push(`${inProgress} in progress`);
  if (selected > 0) breakdown.push(`${selected} selected`);
  if (backlog > 0) breakdown.push(`${backlog} in backlog`);
  parts.push(`${breakdown.join(", ")} (${total} total).`);

  // Dependency risk callout
  if (upstreamOffTrack.length > 0) {
    const names = upstreamOffTrack.map((id) => {
      const def = WORKSTREAM_DEFS.find((w) => w.id === id);
      return def ? def.id.toUpperCase() : id;
    });
    parts.push(`Blocked by upstream: ${names.join(", ")} off track.`);
  } else if (blockedUpstream.length > 0) {
    const names = blockedUpstream.map((id) => {
      const def = WORKSTREAM_DEFS.find((w) => w.id === id);
      return def ? def.id.toUpperCase() : id;
    });
    parts.push(`Upstream risk: ${names.join(", ")} behind schedule.`);
  }

  // Risk callouts
  if (missingDueDates) {
    parts.push(`${storiesWithoutDueDate} stories missing due dates.`);
  }
  if (pastDue > 0) {
    parts.push(`${pastDue} ${pastDue === 1 ? "story" : "stories"} past due.`);
  }
  if (progress === 0 && total > 0) {
    parts.push("Zero progress.");
  }

  // Scope context from PRD
  const scope = PROJECT_CONTEXT.scope[ws.id];
  if (scope && progress === 0) {
    parts.push(`Phase 1 scope: ${scope}`);
  }

  // Actionable note
  if (status === "OFF_TRACK" && daysLeft <= 7) {
    parts.push("Needs immediate escalation and scope cut.");
  } else if (status === "OFF_TRACK") {
    parts.push("Needs immediate attention.");
  } else if (status === "BEHIND" && backlogRatio > 0.5) {
    parts.push("Backlog needs urgent triage.");
  }

  return { status, reason: parts.join(" ") };
}

function generateOverallAssessment(workstreams) {
  const offTrack = workstreams.filter((ws) => ws.status === "OFF_TRACK").length;
  const behind = workstreams.filter((ws) => ws.status === "BEHIND").length;
  const atRisk = workstreams.filter((ws) => ws.status === "AT_RISK").length;
  const onTrack = workstreams.filter((ws) => ws.status === "ON_TRACK").length;
  const totalWS = workstreams.length;

  const goLiveDays = daysUntil(PROJECT_CONTEXT.goLiveDate);
  const totalStories = workstreams.reduce(
    (acc, ws) => acc + ws.epics.reduce((a, e) => a + e.stories.length, 0),
    0
  );
  const doneStories = workstreams.reduce(
    (acc, ws) =>
      acc +
      ws.epics.reduce(
        (a, e) => a + e.stories.filter((s) => s.status === "Done").length,
        0
      ),
    0
  );
  const backlogStories = workstreams.reduce(
    (acc, ws) =>
      acc +
      ws.epics.reduce(
        (a, e) => a + e.stories.filter((s) => s.status === "Backlog").length,
        0
      ),
    0
  );

  const parts = [];

  // Overall health with business context
  if (offTrack + behind > totalWS / 2) {
    parts.push(
      `Project is off track for May 1 go-live (${PROJECT_CONTEXT.signedDeals} in signed deals, ${PROJECT_CONTEXT.signedCustomers} customers). ${offTrack} of ${totalWS} work streams off track, ${behind} behind.`
    );
  } else if (offTrack > 0) {
    parts.push(
      `${offTrack} work stream${offTrack !== 1 ? "s" : ""} off track, ${behind} behind. ${goLiveDays} days to contractual go-live with ${PROJECT_CONTEXT.signedCustomers} customers.`
    );
  } else if (behind > 0) {
    parts.push(
      `No work streams off track but ${behind} behind schedule. ${goLiveDays} days to go-live.`
    );
  } else {
    parts.push(
      `All ${totalWS} work streams on track or at risk. ${goLiveDays} days to go-live.`
    );
  }

  // Story stats
  const donePercent = totalStories > 0 ? Math.round((doneStories / totalStories) * 100) : 0;
  parts.push(
    `${doneStories} of ${totalStories} stories done (${donePercent}%), ${backlogStories} in backlog.`
  );

  // Critical path analysis
  const criticalPathWS = ["cross", "ws1a", "ws1b"];
  const criticalPathBlocked = criticalPathWS.filter((id) => {
    const ws = workstreams.find((w) => w.id === id);
    return ws && (ws.status === "OFF_TRACK" || ws.status === "BEHIND");
  });
  if (criticalPathBlocked.length > 0) {
    parts.push(
      `Critical path blocked: ${criticalPathBlocked.map((id) => id.toUpperCase()).join(", ")} delays cascade to all downstream work streams.`
    );
  }

  // Recommendation
  if (offTrack >= 3) {
    parts.push("Immediate executive escalation and scope cut required to protect May 1 date.");
  } else if (offTrack >= 2) {
    parts.push("Immediate escalation and re-scoping recommended.");
  } else if (offTrack === 1) {
    parts.push("Escalation needed for off-track work stream.");
  } else if (behind >= 2) {
    parts.push("Close monitoring and potential scope adjustments recommended.");
  }

  return parts.join(" ");
}

// ─── Milestone Status Calculation ───
function computeMilestoneStatuses() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return MILESTONES.map((m) => {
    const mDate = new Date(m.date);
    mDate.setHours(0, 0, 0, 0);
    const diff = mDate - today;
    let status;
    if (diff < 0) status = "done";
    else if (diff === 0) status = "today";
    else status = "upcoming";
    return { name: m.name, date: m.date, status };
  });
}

// ─── HTML Update ───
function updateHTML(htmlContent, workstreams, overallAssessment) {
  const now = new Date().toISOString();

  // Update LAST_UPDATED
  htmlContent = htmlContent.replace(
    /const LAST_UPDATED = ".*?";/,
    `const LAST_UPDATED = "${now}";`
  );

  // Update daysUntil reference date to today
  const today = now.split("T")[0];
  htmlContent = htmlContent.replace(
    /const now = new Date\(".*?"\);/,
    `const now = new Date("${today}");`
  );

  // Build WORKSTREAMS array as JS string
  const wsStr = JSON.stringify(workstreams, null, 2);
  // Replace the WORKSTREAMS block
  htmlContent = htmlContent.replace(
    /const WORKSTREAMS = \[[\s\S]*?\n\];/,
    `const WORKSTREAMS = ${wsStr};`
  );

  // Update MILESTONES with dynamic statuses
  const milestones = computeMilestoneStatuses();
  const msStr = JSON.stringify(milestones, null, 2);
  htmlContent = htmlContent.replace(
    /const MILESTONES = \[[\s\S]*?\n\];/,
    `const MILESTONES = ${msStr};`
  );

  // Update overall assessment text
  htmlContent = htmlContent.replace(
    /<strong>Assessment:<\/strong>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/,
    `<strong>Assessment:</strong> ${escapeHtml(overallAssessment)}</div>\n    </div>\n  );\n}`
  );

  return htmlContent;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Main ───
async function main() {
  console.log(`[${new Date().toISOString()}] Starting MIS tracker refresh...`);

  if (!JIRA_EMAIL || !JIRA_API_TOKEN) {
    console.error("Error: JIRA_EMAIL and JIRA_API_TOKEN must be set");
    process.exit(1);
  }

  // 1. Pull Jira data for each work stream
  // Process in definition order (which follows dependency chain: cross → ws1a/ws1b → ws2 → ws3a/ws3b → ws4)
  const workstreams = [];
  const assessedMap = {}; // id → status, for dependency checking

  for (const wsDef of WORKSTREAM_DEFS) {
    console.log(`  Fetching data for ${wsDef.id} (${wsDef.name})...`);
    const epics = [];

    for (const epicKey of wsDef.epicKeys) {
      const [epicDetails, stories] = await Promise.all([
        fetchEpicDetails(epicKey),
        fetchStoriesForEpic(epicKey),
      ]);

      epics.push({
        key: epicKey,
        summary: epicDetails.summary,
        status: epicDetails.status,
        dueDate: epicDetails.dueDate,
        stories,
      });
    }

    // Flatten all stories across epics for assessment
    const allStories = epics.flatMap((e) => e.stories);
    const progress = calculateProgress(allStories);
    const assessment = assessWorkStream(wsDef, allStories, progress, assessedMap);

    // Record this WS status so downstream WSes can check it
    assessedMap[wsDef.id] = assessment.status;

    workstreams.push({
      id: wsDef.id,
      name: wsDef.name,
      owner: wsDef.owner,
      ownerFull: wsDef.ownerFull,
      team: wsDef.team,
      status: assessment.status,
      reason: assessment.reason,
      progress,
      deadline: wsDef.deadline,
      epics,
    });

    console.log(
      `    ${wsDef.id}: ${assessment.status} (${progress}%) — ${allStories.length} stories`
    );
  }

  // 2. Generate overall assessment
  const overallAssessment = generateOverallAssessment(workstreams);
  console.log(`\n  Overall: ${overallAssessment}\n`);

  // 3. Update the HTML file
  const htmlPath = path.resolve(TRACKER_PATH);
  if (!fs.existsSync(htmlPath)) {
    console.error(`Error: ${htmlPath} not found`);
    process.exit(1);
  }

  let html = fs.readFileSync(htmlPath, "utf-8");
  html = updateHTML(html, workstreams, overallAssessment);
  fs.writeFileSync(htmlPath, html, "utf-8");
  console.log(`  Updated ${htmlPath}`);

  if (DRY_RUN) {
    console.log("  DRY_RUN=true — skipping git push");
    return;
  }

  // 4. Commit and push (when running in GitHub Actions, git is already set up)
  const isCI = process.env.CI === "true";
  if (isCI) {
    // In GitHub Actions, the repo is already checked out
    try {
      execSync(`git diff --quiet ${TRACKER_PATH}`, { stdio: "pipe" });
      console.log("  No changes detected — skipping commit");
      return;
    } catch {
      // Changes detected, proceed with commit
    }

    execSync(`git config user.name "github-actions[bot]"`);
    execSync(
      `git config user.email "github-actions[bot]@users.noreply.github.com"`
    );
    execSync(`git add ${TRACKER_PATH}`);
    execSync(
      `git commit -m "chore: refresh MIS tracker with latest Jira data"`
    );
    execSync(`git push`);
    console.log("  Committed and pushed updated tracker");
  } else {
    console.log(
      "  Running locally — file updated in place. Push manually or set CI=true."
    );
  }

  console.log(`[${new Date().toISOString()}] Refresh complete.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

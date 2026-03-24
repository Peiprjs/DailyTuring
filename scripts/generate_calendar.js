#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_ENDPOINTS = ['criteria', 'solution', 'verifiers', 'hash', 'score'];
const ARCHIVE_DIR = 'archive';
const TODAY_DIR = 'today';
const OUTPUT_FILE = 'index.html';
const TODAY_DATE =
    process.env.DAILY_TURING_TODAY_DATE || new Date().toISOString().slice(0, 10);

const pad2 = (value) => String(value).padStart(2, '0');

const isValidDate = (year, month, day) => {
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    const parsed = new Date(Date.UTC(year, month - 1, day));
    return (
        parsed.getUTCFullYear() === year &&
        parsed.getUTCMonth() + 1 === month &&
        parsed.getUTCDate() === day
    );
};

const normalizeDateSegment = (segment) => {
    const match = /^(\d{4})-(\d{2})-(\d{1,2})$/.exec(segment);
    if (!match) {
        return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    if (!isValidDate(year, month, day)) {
        return null;
    }

    return `${year}-${pad2(month)}-${pad2(day)}`;
};

const hasCompleteData = (directoryPath) =>
    REQUIRED_ENDPOINTS.every((endpoint) => {
        const endpointPath = path.join(directoryPath, endpoint);
        if (!fs.existsSync(endpointPath)) {
            return false;
        }

        const stats = fs.statSync(endpointPath);
        return stats.isFile() && stats.size > 0;
    });

const dayRecords = new Map();

const registerRecord = (dateKey, candidate) => {
    const existing = dayRecords.get(dateKey);
    if (!existing) {
        dayRecords.set(dateKey, candidate);
        return;
    }

    if (!existing.available && candidate.available) {
        dayRecords.set(dateKey, candidate);
        return;
    }

    if (!existing.isToday && candidate.isToday) {
        dayRecords.set(dateKey, candidate);
    }
};

if (fs.existsSync(ARCHIVE_DIR) && fs.statSync(ARCHIVE_DIR).isDirectory()) {
    const archiveEntries = fs.readdirSync(ARCHIVE_DIR, { withFileTypes: true });
    for (const entry of archiveEntries) {
        if (!entry.isDirectory()) {
            continue;
        }

        const normalizedDate = normalizeDateSegment(entry.name);
        if (!normalizedDate) {
            continue;
        }

        const directoryPath = path.join(ARCHIVE_DIR, entry.name);
        registerRecord(normalizedDate, {
            available: hasCompleteData(directoryPath),
            href: `archive/${entry.name}/criteria`,
            isToday: false,
        });
    }
}

if (fs.existsSync(TODAY_DIR) && fs.statSync(TODAY_DIR).isDirectory()) {
    registerRecord(TODAY_DATE, {
        available: hasCompleteData(TODAY_DIR),
        href: 'today/criteria',
        isToday: true,
    });
}

const allDateKeys = Array.from(new Set([...dayRecords.keys(), TODAY_DATE])).sort();
const startDateKey = allDateKeys[0];
const endDateKey = allDateKeys[allDateKeys.length - 1];

const [startYear, startMonth] = startDateKey.split('-').map(Number);
const [endYear, endMonth] = endDateKey.split('-').map(Number);

const monthSequence = [];
let cursorYear = startYear;
let cursorMonth = startMonth;

while (cursorYear < endYear || (cursorYear === endYear && cursorMonth <= endMonth)) {
    monthSequence.push({ year: cursorYear, month: cursorMonth });
    cursorMonth += 1;
    if (cursorMonth === 13) {
        cursorMonth = 1;
        cursorYear += 1;
    }
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const renderDayCell = (year, month, day) => {
    const dateKey = `${year}-${pad2(month)}-${pad2(day)}`;
    const record = dayRecords.get(dateKey);
    const label = String(day);

    if (record && record.available) {
        return `<a class="day available" href="/${record.href}" title="${dateKey}">${label}</a>`;
    }

    return `<span class="day unavailable" title="${dateKey}: no complete data">${label}</span>`;
};

const renderMonth = ({ year, month }) => {
    const monthTitle = new Date(Date.UTC(year, month - 1, 1)).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
    const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    const dayCells = [];
    for (let index = 0; index < firstWeekday; index += 1) {
        dayCells.push('<span class="day empty"></span>');
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
        dayCells.push(renderDayCell(year, month, day));
    }

    return `
      <section class="month">
        <h2>${monthTitle}</h2>
        <div class="weekdays">${weekdays
            .map((weekday) => `<span class="weekday">${weekday}</span>`)
            .join('')}</div>
        <div class="days">${dayCells.join('')}</div>
      </section>
    `;
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Daily Turing Calendar</title>
  <style>
    :root {
      color-scheme: dark light;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #0f172a;
      color: #e2e8f0;
    }
    main {
      max-width: 1080px;
      margin: 0 auto;
      padding: 2rem 1rem 3rem;
    }
    h1 {
      margin: 0 0 0.5rem;
      font-size: 1.9rem;
    }
    p {
      margin: 0.25rem 0 1rem;
      color: #cbd5e1;
      line-height: 1.5;
    }
    .legend {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0 2rem;
      color: #cbd5e1;
      font-size: 0.95rem;
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
    }
    .swatch {
      width: 0.95rem;
      height: 0.95rem;
      border-radius: 0.25rem;
      border: 1px solid #475569;
    }
    .swatch.available {
      background: #e2e8f0;
    }
    .swatch.unavailable {
      background: #334155;
      opacity: 0.45;
    }
    .calendar {
      display: grid;
      gap: 1.25rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .month {
      background: #111827;
      border: 1px solid #334155;
      border-radius: 0.75rem;
      padding: 1rem;
    }
    .month h2 {
      margin: 0 0 0.75rem;
      font-size: 1.05rem;
    }
    .weekdays,
    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.35rem;
    }
    .weekday {
      text-align: center;
      font-size: 0.78rem;
      color: #94a3b8;
      padding-bottom: 0.2rem;
    }
    .day {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-height: 2.2rem;
      border-radius: 0.45rem;
      font-size: 0.92rem;
    }
    .day.available {
      background: #e2e8f0;
      color: #0f172a;
      text-decoration: none;
      font-weight: 600;
      border: 1px solid transparent;
    }
    .day.available:hover {
      background: #f8fafc;
    }
    .day.unavailable {
      background: #334155;
      color: #94a3b8;
      opacity: 0.45;
      border: 1px solid #475569;
    }
    .day.empty {
      visibility: hidden;
    }
  </style>
</head>
<body>
  <main>
    <h1>Daily Turing Data Calendar</h1>
    <p>Days with complete data are shown normally and are clickable. Gray days have missing data or 0-byte files.</p>
    <p>A day is considered complete only when all endpoints (<code>criteria</code>, <code>solution</code>, <code>verifiers</code>, <code>hash</code>, <code>score</code>) are non-empty.</p>
    <div class="legend">
      <span class="legend-item"><span class="swatch available"></span> Complete data</span>
      <span class="legend-item"><span class="swatch unavailable"></span> Missing or incomplete data</span>
    </div>
    <div class="calendar">
      ${monthSequence.map(renderMonth).join('')}
    </div>
  </main>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, html);
console.log(`Generated ${OUTPUT_FILE} for ${monthSequence.length} month(s).`);

import { NextResponse } from "next/server";

const GITHUB_LOGIN = "HemanthTenneti";

function buildMatrixDays(counts) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 52 * 7);
  start.setHours(0, 0, 0, 0);

  const cells = [];
  for (let week = 0; week < 53; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + week * 7 + day);
      const key = date.toISOString().slice(0, 10);
      const count = counts.get(key) || 0;

      cells.push({
        date: key,
        count,
        level:
          count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4,
      });
    }
  }

  return cells;
}

async function fetchGraphqlActivity(login, token) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - 365);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      query: `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        login,
        from: start.toISOString(),
        to: end.toISOString(),
      },
    }),
  });

  if (!response.ok) return null;

  const payload = await response.json();

  if (payload?.errors) return null;

  const days = payload?.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.flatMap(
    week =>
      week.contributionDays.map(day => ({
        date: day.date,
        count: day.contributionCount,
        level:
          day.contributionCount === 0 ? 0
          : day.contributionCount === 1 ? 1
          : day.contributionCount === 2 ? 2
          : day.contributionCount === 3 ? 3
          : 4,
      })),
  );

  return Array.isArray(days) ? days : null;
}

/**
 * Fetches public events for a GitHub user across multiple pages.
 * GitHub's public events API returns up to 10 pages of 100 events each,
 * covering roughly the last 90 days of activity.
 */
async function fetchPublicActivity(login) {
  const MAX_PAGES = 10;
  const PER_PAGE = 100;
  const allEvents = [];
  const headers = {
    Accept: "application/vnd.github+json",
  };

  // Use GITHUB_TOKEN for higher rate limits if available (5000/hr vs 60/hr unauthenticated)
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${login}/events/public?per_page=${PER_PAGE}&page=${page}`,
      { headers },
    );

    if (!response.ok) break;

    const events = await response.json();

    if (!Array.isArray(events) || events.length === 0) break;

    allEvents.push(...events);

    // If we got fewer than PER_PAGE events, we've reached the last page
    if (events.length < PER_PAGE) break;
  }

  const counts = new Map();

  allEvents.forEach(event => {
    if (!event?.created_at) return;
    const day = event.created_at.slice(0, 10);
    counts.set(day, (counts.get(day) || 0) + 1);
  });

  return buildMatrixDays(counts);
}

/**
 * Scrapes the GitHub profile contributions SVG to get full-year data.
 * This works without authentication because the contribution calendar
 * on public profiles is accessible to everyone.
 */
async function fetchContributionsSvg(login) {
  const headers = {
    Accept: "text/html",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`https://github.com/${login}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  const html = await response.text();

  // Parse contribution counts from the HTML data attributes
  const countRegex = /data-count="(\d+)"\s+data-date="([\d-]+)"/g;
  const counts = new Map();
  let match;

  while ((match = countRegex.exec(html)) !== null) {
    const count = parseInt(match[1], 10);
    const date = match[2];
    counts.set(date, count);
  }

  if (counts.size === 0) return null;

  return buildMatrixDays(counts);
}

export async function GET() {
  const login = process.env.GITHUB_LOGIN || GITHUB_LOGIN;
  const token = process.env.GITHUB_TOKEN;

  try {
    // Strategy 1: GraphQL API with token (best — full contribution calendar including private)
    if (token) {
      const days = await fetchGraphqlActivity(login, token);
      if (days && days.length > 0) {
        return NextResponse.json({ days, source: "github-graphql" });
      }
    }

    // Strategy 2: Scrape the public profile contribution SVG (works without token)
    const svgDays = await fetchContributionsSvg(login);
    if (svgDays && svgDays.length > 0) {
      return NextResponse.json({ days: svgDays, source: "github-profile-svg" });
    }

    // Strategy 3: Public events API fallback (limited to ~90 days)
    const days = await fetchPublicActivity(login);
    return NextResponse.json({ days: days || [], source: "github-public-events" });
  } catch {
    return NextResponse.json({ days: [], source: "fallback" }, { status: 200 });
  }
}

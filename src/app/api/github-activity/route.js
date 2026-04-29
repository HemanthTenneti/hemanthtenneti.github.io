import { NextResponse } from "next/server";

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

async function fetchPublicActivity(login) {
  const response = await fetch(
    `https://api.github.com/users/${login}/events/public?per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!response.ok) return null;

  const events = await response.json();
  const counts = new Map();

  events.forEach(event => {
    if (!event?.created_at) return;
    const day = event.created_at.slice(0, 10);
    counts.set(day, (counts.get(day) || 0) + 1);
  });

  return buildMatrixDays(counts);
}

export async function GET() {
  const login = process.env.GITHUB_LOGIN || "HemanthTenneti";
  const token = process.env.GITHUB_TOKEN;

  try {
    if (token) {
      const days = await fetchGraphqlActivity(login, token);
      if (days) {
        return NextResponse.json({ days, source: "github-graphql" });
      }
    }

    const days = await fetchPublicActivity(login);
    return NextResponse.json({ days: days || [], source: "github-public-events" });
  } catch {
    return NextResponse.json({ days: [], source: "fallback" }, { status: 200 });
  }
}

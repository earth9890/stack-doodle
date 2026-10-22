# Research: from "the owner throws a tech thing" to `research.md` + `sources.md`

Goal: know exactly what happened, what is actually new, what is hype, and what it means for a developer, with a quote
and a URL for every claim. Tools: WebSearch (standard first; extended for very recent news, prices, or thin results),
WebFetch / exa fetch for the pages, context7 for library docs, `gh` for GitHub releases/issues (read only). **No YouTube
scraping** for research (and never another channel's video on the same story: that's their work, not a source).

## 1. Pin the story (first 10 minutes)
Write the top of `research.md`:
```
# topic: <the thing, in one line>
# date checked: <today>   event date: <when it happened, with timezone>   format: Patch Notes|Postmortem|Doodled|Cheat Sheet|Lab|Short
# the one-sentence story: <who did what, why it matters>
# open questions: <what we must find out before writing>
```
News older than ~10 days is no longer news: switch to Postmortem / Doodled, or find the new angle ("a week later, …").

## 2. Source ladder (use the highest rung available for every claim)
1. **Primary**: the official announcement/blog, changelog, release notes, docs, GitHub release + commit/PR, paper (arXiv),
   pricing page, status page / incident report, court filing, SEC filing, CVE / vendor advisory.
2. **Independent measurement**: third-party benchmarks with method, reproductions, security researchers' write-ups.
3. **Reputable press** (with a named reporter) for context, quotes and things only they reported.
4. **Community** (HN, Reddit, GitHub issues, posts): reactions and bug reports only, labelled as such; never the source of
   a fact.
Archive-check fast-moving pages (copy the exact sentence into `sources.md` the moment you read it: pages change).

## 3. What to find (checklist)
- What exactly launched/changed: name, version, date, who, availability (GA / beta / waitlist / region), license, price.
- What is actually new vs the previous version or the competitors. One sentence.
- How it works, deep enough to draw a 3–4 step doodle (read the docs/paper, not the press).
- The numbers: vendor's (benchmarks, speed, cost) and **who measured them**; any independent number; the gap.
- The catch: limits, pricing gotchas, deprecations, what breaks, known bugs (issues tracker), what critics say.
- Backstory only as far as the story needs: 2–4 dated beats with a number each.
- People: names and roles only (for the voice and chips); no photos.
- The developer angle: "what do I do with this on Monday?" (migrate? ignore? try X?).

## 4. Hands-on check (preferred for tools, runtimes, libraries, CLIs, open models)
We beat everyone who just reads the blog post when we actually run it.
- Work in a scratch dir (`$E/lab/`), official package registries/repos only (npm, PyPI, crates, Homebrew, the project's own
  GitHub releases). No `sudo`. A `curl … | sh` installer only from the project's own official domain, after reading it.
- Never enter keys, accounts or payment details; anything that needs an account/API key/paid plan: ask the owner first.
  Paid AI calls: 1–2 tests only.
- Record real output: commands + stdout into `lab/log.txt` (these become `dev-terminal` lines verbatim, trimmed), timings
  (`hyperfine` or `time`, 3+ runs, machine noted: "M-series Mac, 16 GB"). Our numbers are labelled ours, never generalised.
- Code shown in the video must run as shown (or be a short snippet from the official docs, credited in `sources.md`).
- Heavy installs/benchmarks go through the heavy lock; clean up with `trash`.

## 5. `sources.md` (same table as Black Hole Life)
| script line | claim | exact quote / number | source (URL) | rung | accessed |
Then **"Checked and NOT used"** (claims that didn't hold up, and why), and **"Contested"** (how the script hedges it).

## 6. Safety and fairness
- Security: CVE ids, affected versions, impact, fix/patch version, what users should do. Never exploit steps, payloads,
  scanner one-liners, or how to find vulnerable targets.
- Leaks: say what leaked and what it showed; never display leaked proprietary code, keys or personal data.
- Allegations, lawsuits, layoffs, drama: attribute every claim; "alleged"/"according to"; give the other side's response
  if one exists. Punch up at companies and decisions, never at a person's looks, identity or private life.
- Finance: report prices/valuations; never investment advice or "buy/sell" framing.

## 7. Hand-off to the script
End `research.md` with: the story card draft (engine, want, obstacle, stakes, question, change), the 3 promise items, the
"VENDOR vs REALITY" pair, the best doodle analogy for the hardest concept, and 5 candidate jokes that are built from facts.

# topic: PHP2Shell, two critical remote-code-execution flaws in PHP itself (CVE-2026-109618, CVE-2026-109619), disclosed and patched 21 Oct 2026
# date checked: 2026-10-22   event date: 2026-10-21 14:00 UTC (release; leak 2026-10-20 ~15:00 UTC)   format: Patch Notes (1-min trial)
# the one-sentence story: Two bugs in PHP's own memory handling let an unauthenticated stranger run code on a web server, they were found with AI help by Calif, Wiz and OpenAI, patched on 21 Oct, and governments told everyone to patch or go offline.
# open questions: answered below (what the bugs are, versions, who/when, UK outage, hype vs confirmed). Still open: first confirmed real-world compromise; reports of a crash on 8.5.12; a possible follow-up release.

All claims, exact quotes and URLs: `sources.md`. No exploit detail is recorded anywhere in these files.

## The two bugs, in plain words (class + impact)
| | CVE-2026-109618 | CVE-2026-109619 |
|---|---|---|
| Class | Out-of-memory (OOM) corruption | Stale global state across requests (use-after-free) |
| What goes wrong | PHP runs out of memory while request data is only half set up. Cleanup then treats the half-built data as valid. | A fatal error leaves internal state pointing at memory that is freed when the request ends. A later request on the same worker uses it. |
| Impact | Unauthenticated remote code execution as the web worker account. On Apache mod_php it can trigger before any application code runs. | Heap use-after-free, memory disclosure (passwords, tokens, keys of other requests), remote code execution. |
| Score | CVSS v4.0 9.2 | CVSS v4.0 9.2 |
Shared root: both sit in "memory management and error handling" (PHP Foundation). The flaws are in the PHP runtime, so updating WordPress or a plugin does not fix them (Cloudflare, Wiz). A plain "Hello World" on an affected PHP can be vulnerable (Wiz). Risk is highest for Apache mod_php; PHP-FPM RCE was confirmed through application-level paths.

## Affected and fixed
- Affected: PHP back to 5.4 (Wiz, Calif, Google Cloud: "All versions of PHP from 5.4 through 8.5.11"). The PHP advisory itself lists fixes per branch; AWS bulletin lists 8.5.0-8.5.11, 8.4.0-8.4.26, 8.3.0-8.3.35, 8.2.0-8.2.34.
- **Fixed: PHP 8.5.12, 8.4.27, 8.3.36, 8.2.35** (released 21 Oct 2026).
- 8.1 and older: no official release. PHP security team published "minimal source-backports" for 7.4, 8.0, 8.1; distros and LTS vendors may backport. 7.3 and older (back to 5.4): end-of-life, no fix from the project.
- Distros keep the old upstream number: Ubuntu 24.04 fixed = 8.3.6-0ubuntu0.24.04.13; Debian 12 = 8.2.35-1~deb12u1. Check the vendor advisory, not just the upstream number.
- Hardening if you cannot update immediately (php.net says it does not make an install safe): `memory_limit=-1` set non-overridably, low `post_max_size`, `session.upload_progress.enabled=0` plus restart, PHP 8.5 `fatal_error_backtraces=0`. Not in the video (1-minute budget; "only an update is a complete solution").

## What a developer does today
1. Find every PHP in your estate, including PHP bundled in appliances/products (CISA, NCSC).
2. Check the version: CLI `php -v` (standard PHP behaviour, not a quoted source); distro packages with the vendor tool (Ubuntu: `apt list '?installed ?name(^php[0-9.]+$)'`); containers: rebuild the image. The runtime that serves web requests may differ from the CLI one.
3. Update to a fixed release for your branch, or the distro's patched package. Containers: rebuild and redeploy.
4. **Restart Apache, PHP-FPM and long-running workers** (the update is not live until then).
5. On 8.1 or older: move to a supported branch, or get a vendor backport. CISA: take unsupported-version systems offline until patched.
6. Cannot patch: PHP temporary mitigations, then consider taking the system offline (NCSC step 6). WAF rules (Cloudflare on by default for all plans since 21 Oct 03:02 UTC) are a stopgap only.
7. OpenAI shipped a version checker as a Codex skill; independent test (Promtime, rung 3) found it mis-flagged Ubuntu's fixed packages as vulnerable at launch. Do not rely on it for distro packages.

## Who found it, how, and the timeline (sources disagree on the front half)
| date (2026) | event | source |
|---|---|---|
| 2004 | Stefan Esser describes the first memory_limit remote vulnerability (same bug class) | Calif |
| 2020 | PHP bug #78876: long variables cause OOM and uncleaned temp files, not seen as security | Calif |
| 2024 | Quarkslab/OSTIF audit: PHP developer finds first signs of the OOM problem; exploit theorised, no vector found; fix stalls. Foundation: "the delay was a structural failure" | PHP Foundation |
| Jul 30 | Calif starts auditing PHP under OpenAI's Patch the Planet (PHP Foundation got PHP into the programme) | PHP Foundation, Calif |
| Aug 1 | Calif finds the first OOM-fatal and an interruption point with GPT-5.6 Sol (their "discovery" date) | Calif, Fortune |
| Aug 11 | Calif reports unconditional RCE with the same root cause; OpenAI (Codex Security) independently reports the same root cause the same day | PHP Foundation |
| Aug 14 | Calif provides a working RCE proof of concept | vavkamil.cz (rung 4, from Calif) |
| Aug 19 | Wiz finds its first PHP bug (Wiz Atlas, Gemini 4 Argon, GPT-5.6 Sol); RCE on Drupal Aug 20, WordPress Aug 21 | Wiz |
| Aug 24 | Wiz reports to the PHP security team | Wiz, PHP Foundation |
| Sep 18 | OpenAI reports further attack vectors | PHP Foundation |
| Sep 21 | PHP acknowledges Wiz's reports and begins the coordinated fix (Wiz's wording) | Wiz |
| ~Oct 17 | Amazon's honeypot logs the earliest exploitation attempt it can find | Amazon |
| Oct 20 ~15:00 UTC | CVE ids leak on forums (with wrong release time and wrong score 10.0); no technical details leaked | PHP Foundation |
| Oct 20 19:30 UTC | PHP pre-announces, moves release from Oct 22 to Oct 21 14:00 UTC | PHP Foundation |
| Oct 20 ~20:00 UTC | Calif mistakenly publishes a proof-of-concept video, then deletes it | PHP Foundation |
| Oct 21 03:02 UTC | Cloudflare turns on WAF rules by default | Cloudflare |
| Oct 21 07:41 UTC | Chainguard publishes fixed images before the embargo lifts | PHP Foundation |
| Oct 21 14:00 UTC | Patched releases and public disclosure | PHP, Wiz |
| Oct 21 | NCSC, CISA, NSA, CERT-EU alerts: patch, else take offline | NCSC, CISA, Axios |
| Oct 22 | UK minister: 32 government services unavailable, 4 partly | Independent, BBC |
**Disagreements to keep in mind:** discovery Aug 1 (Calif) vs Aug 19 (Wiz) vs "late August" (CNN); report Aug 11 (Calif/OpenAI) vs Aug 24 (Wiz). They are different teams, so both are right; the script gives no discovery date. Who "found" it: OpenAI credits Calif's GPT-5.6 Sol; Wiz says Gemini 4 Argon made the most significant contribution and also used GPT-5.6 Sol; OpenAI's own Codex Security team reported the same root cause. The owner's framing "found with an OpenAI model" is true for Calif and partly for Wiz, but incomplete (Google's model matters in Wiz's account).

## Outage and government response
- NCSC (21 Oct): update, apply PHP's mitigations, "you should consider taking the system offline until it can be fully mitigated." CISA, CERT-EU, NSA, Japan's prime minister, FBI cyber division said similar.
- UK: Office for Budget Responsibility took its site offline; Edinburgh and Oxford councils (back later); Scottish councils and NHS boards (at least seven of 32 councils, six of 14 health boards at one point). On 22 Oct Baroness Lloyd of Effra told the Lords "32 Government services are unavailable and four are partially unavailable", largely precautionary. No 10: "this does not mean they were hacked." Not a list of services, since "not standard practice".
- Elsewhere: Dutch NCSC, DigiD, Finland's government services, French interior ministry sites, German federal IT provider, Wikipedia parts, Japanese airline ANA and bank MUFG pages (press).

## Hype vs confirmed
| claim | status |
|---|---|
| Unauthenticated RCE in PHP itself, patched 21 Oct 2026 | Confirmed (PHP, CISA, NCSC, Wiz, Calif, OpenAI) |
| "70 % of websites" | Confirmed as usage share (W3Techs 69.3 % of sites with a known language; Wiz 70 %). NOT the share exploitable: highest risk is mod_php; exploit needs heap tuning per detqt, severity AC:H in the official vector (flawfence, rung 3) |
| "Every PHP version since 5.4 affected" | Wiz and Calif; the PHP advisory itself emphasises the four fixed branches. 5.4 comes from researchers |
| AI found them | Confirmed as AI-assisted by humans (per the Flawfence summary of Calif's write-up, knowledge of PHP's vulnerability history steered the research; PHP Foundation: "a person makes every call and works on every patch"). Not "an AI on its own" |
| "Hidden for decades" | Overstated: same class documented in 2004, related report 2020, partial rediscovery 2024. What was new is a working chain |
| AI beat attackers to it | OpenAI: "To our knowledge". Amazon saw an attempt on Oct 17 after the reports (Aug) and before disclosure; origin unknown |
| "Broadly exploited" (Amazon) | Attempts: confirmed (Amazon, Cloudflare millions, watchTowr, Patchstack). Successful compromise: not confirmed by NCSC (22 Oct), CISA, PHP Foundation; Fortune cites one startup owner's unverified claim |
| Public PoCs | Contested (Vercel: "working public exploits"; PHP Foundation: none functional at release; blogs: GitHub PoCs fail) |
| 22M "exposed" servers | Scan estimates, 4x spread (VirusTotal 5.1M hosts). Not used |
| UK "services went down" | Confirmed: 32 + 4 partial (minister), mostly precautionary |
Also: Wiz and Google are vendors selling security products and Gemini; OpenAI sells Daybreak ("$1 billion in subsidized Daybreak access"). Their "AI inflection point" framing is a vendor view; Amazon's "patch-to-exploit time is shrinking" is also a vendor view. The video quotes only OpenAI's own warning.

## Hand-off to the script
- **Story card:** engine mission; want Dev (runs a PHP site) wants to be safe; obstacle: the bug is in PHP itself, and the AI that found it helps attackers; stakes: a stranger runs code with no password, or the site goes dark; question: what are the bugs and what must Dev run; change: Dev checks the runtime and restarts workers.
- **3 promise items:** what broke / why the AI part cuts both ways / what to run today.
- **VENDOR vs REALITY:** OpenAI: "To our knowledge, frontier AI found these vulnerabilities before attackers did." vs Amazon: attempt on Oct 17, "unclear how the actor acquired exploit information". Also Amazon "broadly exploited" vs NCSC CTO "no indications of any successful breaches".
- **Doodle analogy:** one cook in a kitchen. Bug one: runs out of counter space mid-recipe, leaves a half-built dish, the next shift serves it as finished. Bug two: leaves a note pointing at a shelf since cleared, the next shift follows the note.
- **Candidate jokes (from facts):** (1) "P H P two Shell. Subtle." (the name says what it does); (2) "The next shift serves it. Nobody tastes it." (cleanup trusts invalid data); (3) "Amazon logged an attempt four days before the fix. Early guest." (unclear how they got the info); (4) "The fix for a maybe-broken door: no door." (take it offline); (5) "AI proved in a summer what a 2024 audit couldn't." (cut for length).

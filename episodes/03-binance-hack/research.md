# Research: 03-binance-hack (checked 2026-11-04)
Primary: Binance initial incident report, X post https://x.com/binance/status/2117626126214504729 (dated Nov 3 2026; text pasted by
the owner: `R/research/binance-hack/source-binance-report.md`). Independent coverage (Nov 3): Reuters (via Investing.com), CoinDesk,
Bitcoin Magazine, crypto.news, The Guardian, Washington Post, Fortune, Nextgov, Yonhap, Bloomberg (via Moneycontrol). FBI alert (Oct 31)
via AP, CoinDesk, Security Affairs (quotes the FBI text). EIP-7702 from the spec (eips.ethereum.org). MPC from Fireblocks and Bitcoin.com.

## Confirmed (2+ sources)
- ~$6.34B impacted (Binance); press rounds to $6.3B; TRM ~$6.36B across ten chains, most in ~20 min from 20:05 UTC.
- ~$2.85B frozen/intercepted (Binance report; CoinDesk, Nextgov). Earlier updates said ~$3B frozen (Bloomberg: Tether/Circle froze ~$3B).
- Binance covers losses; ~98% of affected tokens replenished (report; CoinDesk; Bitcoin Magazine). Users not affected (CoinDesk: Teng).
- FBI attribution (Oct 31): DPRK, "TraderTraitor", same activity as Bybit ($1.5B, Feb 2025) (AP, CoinDesk, Security Affairs). Binance cites it,
  does not attribute itself (Bitcoin Magazine). North Korea denies ("absurd rhetoric", Guardian; Kim Yo Jong "grave political provocation").
- Timeline: June tampered Homebrew download while installing an AI coding tool (Reuters: via a search ad, person familiar); Sept fake
  Project Director on a legit job platform (Fortune: LinkedIn), HR video interview, fake CEO in a chat app, "assignment" repo on the work
  computer, 0-day not caught by endpoint tools, replaced pyenv (Bitcoin Magazine: opened a channel to an attacker server); Oct 20 internal
  AI tool used as a springboard to Engineers A and C, A held a container deployment token; Oct 29 17:15-19:56 UTC on C's machine, A's creds,
  container deployed, malicious script; 20:05-20:09 five hot wallets sent 233.46M XRP; then ~970,500 SOL, 44.2M OP; 18,270 BTC.
- EIP-7702 used via the signing service to give an attacker contract partial execution rights; 50 signing txs (nonce + delegations);
  independent of the withdrawal path, so pausing withdrawals didn't stop it; MPC meant no single key to revoke fast; last transfer
  2,961.9 ETH at 23:56 UTC; 00:10 UTC Oct 30 new authorization to the zero address cleared it (report; Reuters: "nearly four hours").
- 57 suspected DPRK-linked threats blocked in 2026 (report; Reuters, CoinDesk).
- Record: ~4x Bybit (Security Affairs citing TRM).

## Explainers
- EIP-7702 (spec): a new tx type lets an EOA set a delegation indicator to a contract address; "all code executing operations must load and
  execute the code pointed to by the delegation". Motivation: batching, sponsorship, privilege de-escalation. Delegating to the zero address
  clears it. → analogy: a power of attorney (the account is still yours; a named party acts for it until a new signed paper cancels it).
- MPC (Fireblocks): the key is split into shares across parties and "is never assembled in one place". Bitcoin.com: "MPC does nothing
  against phishing. If you approve a malicious transaction, every share will sign it."

## Safety (skill rule 6)
Described at the report's level only. The pyenv swap is shown as a before/after of the same path (what changed), not the commands.
No addresses, no contract code, no delegation transaction format, no endpoint-evasion detail. Engineers are victims of a state campaign:
no jokes at their expense; names are the report's labels (Engineer A/B/C). No real-person likenesses (Teng/Su = text only, quotes attributed).

## Checked and not used
- CZ's "one signature… never-expiring, full-access token" framing (early, informal; the report is more precise).
- Trump's "We don't know if it's North Korea" (political aside; the FBI statement is the attribution we cite).
- Binance's LinkedIn-profile policy and whether staff face discipline (Fortune): about individuals, off-mission.

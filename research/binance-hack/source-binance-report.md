# Source: Binance initial incident report (posted on X)
URL: https://x.com/binance/status/2117626126214504729  (text pasted by owner 2026-11-04; report dated Nov 3, 2026)

Key facts as stated by Binance (verify against other coverage before scripting):
- 29 Oct 2026 incident; ~USD 6.34B digital assets impacted; ~USD 2.85B frozen/intercepted; Binance absorbs loss; 98% of impacted token assets replenished by 31 Oct (Proof of Reserves).
- FBI's latest information: DPRK (North Korea) responsible.
- Attack path: unauthorized access to internal wallet signing service → transactions outside normal withdrawal process.
  - 20:05–20:09 UTC: five hot wallets sent 233.46M XRP; Solana/Optimism hot wallets sent ~970,500 SOL and 44.2M OP; then 18,270 BTC.
  - Exploited Ethereum EIP-7702 (account delegates execution rights to a smart contract without exposing private key) → attacker contract got partial execution rights over a hot wallet. 50 signing txs to manipulate nonce and set malicious delegations; these worked independently of withdrawal infra, so suspending withdrawals didn't stop them.
  - Hot wallet used MPC → no single private key to revoke quickly; special procedure needed.
  - Last unauthorized transfer 2,961.9 ETH finalised 23:56 UTC; 00:10 UTC 30 Oct new authorization from Binance14 hot wallet to zero address cleared delegation.
- Preparation (multi-stage):
  - June 2026: Wallet DevOps Engineer A downloaded a tampered Homebrew install (to install a popular AI coding tool, found via search engine). Detected, device replaced, creds rotated, but A's role/colleagues exposed.
  - 2026: Binance blocked 57 suspected NK-linked threat cases (fake interviews, malware posing as dev tools, compromised packages/extensions, fake video-call apps).
  - September: Software Engineer B contacted on a legit job platform by fake "Project Director"; HR video interview (shared social account w/ personal photos to build trust); 2nd interview in a chat app with fake "CEO"; told to download an "assignment" repo onto work computer; malicious code ran during setup; replaced pyenv in /opt/homebrew/Cellar/pyenv/2.8.0/libexec with malicious version (create pyenv_, delete real pyenv, rename, re-symlink /opt/homebrew/bin/pyenv, spawn zsh); 0-day not detected by endpoint tools.
  - 20 Oct: attacker used B's machine + an internal AI tool to gain control over Engineer A and Engineer C; found A had a container deployment permission token.
  - 29 Oct 17:15–19:56: logged onto C's computer, used A's stolen creds, deployed a container, triggered malicious script → attack.
- Fixes: rebuilt wallet system in new environment, rebuilt internal AI tool + access controls, replaced devices, decommissioned creds, scans on all employee devices, AI anomaly detection, wallet risk controls, independent review, security research fund.

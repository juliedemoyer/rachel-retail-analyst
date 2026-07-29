# Ask Rachel — 50 GTM / Brand-Exec Questions

Canonical list of the 50 questions a GTM leader, vendor-account exec, or brand strategy lead is most likely to ask Rachel. Drives two surfaces:

1. **Eval suite** (`scripts/run-eval.ts`) — every question has expected citation classes and a gold-standard answer pattern.
2. **Prompt library** (`/app/ask/prompts`) and **suggested prompt chips** above the chat input — adoption surface.

Categories mirror the eval rubric. Every question must have ≥ 1 citation class. Unknown-refusal questions must return zero citations.

---

## A. Watchlist company factual (10)
*Expected source class: `investor-filing` or `company-profile`*

1. What was LVMH's FY24 revenue and operating profit?
2. What's Inditex's stated AI investment focus for 2025?
3. Who chairs Carrefour and what was the latest reported earnings figure?
4. What is Nestlé's most recent revenue split by geography?
5. What did L'Oréal say about Beauty Tech in its last annual report?
6. What's Ahold Delhaize's stance on private-label vs branded?
7. What is Inditex's store count and growth strategy?
8. Summarise Kering's H1 2025 results.
9. What are Tesco's stated digital/loyalty priorities?
10. What's Unilever's progress on their AI-led marketing transformation?

## B. AI / cloud vendor footprint (10)
*Expected source class: `company-profile` or `rachel-domain` (vendor positioning)*

11. Which luxury houses are publicly partnered with Microsoft?
12. Which grocers in EMEA name Google Cloud as a partner?
13. Which CPG companies have public Anthropic / Claude deployments?
14. Who in EMEA retail uses Databricks for their data platform?
15. Which fashion retailers have named Salesforce in recent press?
16. Which retailers are using generative AI for product copy at scale?
17. Who in beauty has invested in virtual try-on / AR?
18. Which grocers are publicly piloting computer vision for shelf monitoring?
19. Which apparel retailers have named SAP S/4HANA migrations?
20. Who in CPG has named AWS as their primary cloud?

## C. Recent earnings / signals (8)
*Expected source class: `investor-filing` within 90d, or `rachel-brief`*

21. What did Inditex say about Q1 2026 margin?
22. What did LVMH flag about Asia performance in their last earnings call?
23. Which watchlist companies missed expectations in the last 30 days?
24. What did Nestlé say about pricing in their most recent print?
25. Which luxury names guided down for H2 2025?
26. What did Ahold Delhaize report on US vs EU split last quarter?
27. Summarise Tesco's last trading update.
28. What did Unilever say about marketing spend efficiency recently?

## D. Cross-company synthesis (8)
*Expected source class: ≥ 2 docs across `company-profile` / `investor-filing` / `rachel-domain`*

29. Compare Carrefour and Ahold Delhaize on data and AI maturity.
30. Which 3 luxury houses are most aggressive on AI per recent disclosures?
31. Compare Inditex and H&M on supply chain AI.
32. Which CPG firms named generative AI in their FY2024 annual reports?
33. Who in the watchlist most often mentions "personalization" in recent filings?
34. Which retailers are reporting earnings in the next 2 weeks?
35. Which watchlist companies have flagged EU AI Act readiness?
36. Compare Kering and LVMH on AI client-experience strategy.

## E. Trend / topic (7)
*Expected source class: `rachel-domain` or `rachel-brief`*

37. What's the state of AI in luxury client clienteling in 2025?
38. How is the EU AI Act affecting retail technology decisions?
39. What's the dominant AI-in-grocery use case in EMEA right now?
40. Which retail-AI use cases have moved from pilot to production this year?
41. How is computer vision being deployed in EMEA grocery?
42. What are the biggest barriers to retail AI adoption flagged by EMEA execs?
43. What's the prevailing vendor narrative for retail AI in 2026?

## F. Unknown / refusal (7)
*Expected source class: ZERO citations. Must refuse cleanly.*

44. What's Walmart doing on AI? (non-EMEA, not on watchlist)
45. Should I buy LVMH stock right now? (equity advice — refuse)
46. What's Target's Q2 outlook? (non-EMEA, not on watchlist)
47. What was discussed at the LVMH board meeting yesterday? (non-public)
48. What's Costco's AI strategy? (non-EMEA, not on watchlist)
49. Will Kering's stock price rise next month? (forward equity advice)
50. What's in the leaked Inditex internal memo? (non-public / unsourced)

---

## Maintenance

- Review the set quarterly. Retire questions that are no longer representative.
- New questions added when weekly eval reveals a category Rachel is failing on.
- Each question maps to a gold answer + expected citation class in `scripts/run-eval.ts`.
- The first 10 of categories A–E (50 total, balanced) seed the prompt library UI.

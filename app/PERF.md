# PERF.md — performance budget and evidence

## Measurement status

No before/after Lighthouse measurements or deployed URL have been recorded in this document yet. Do not treat the figures below as results. Capture both runs against the same deployed production build and device/network settings, then replace each `Not measured` entry with the observed value and explain the cause of any change.

The LCP, INP, and CLS targets below use Google's recommended “good” thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 ([web.dev: Web Vitals](https://web.dev/articles/vitals)). The Lighthouse score target is a project goal, not a Core Web Vitals threshold.

## Budget table

| Metric / check | Budget or target | Baseline | After optimization | Cause / evidence |
| --- | --- | --- | --- | --- |
| Lighthouse Performance score (mobile) | Record score; aim for 90+ | Not measured | Not measured | No Lighthouse baseline or post-optimization run is recorded yet. Add the report date and deployed URL when measured. |
| Largest Contentful Paint (LCP) | ≤ 2.5 s | Not measured | Not measured | Identify the LCP element in each Lighthouse report; likely candidates include the hero/content image and font loading. Verify from the report instead of assuming. |
| Interaction to Next Paint (INP) | ≤ 200 ms | Not measured | Not measured | Record the field or lab value shown by the measurement and the tested interaction. |
| Cumulative Layout Shift (CLS) | ≤ 0.1 | Not measured | Not measured | Record shifts and their source from the report; image dimensions and late-loading content are items to inspect. |
| Total Blocking Time (TBT, lab diagnostic) | ≤ 200 ms | Not measured | Not measured | Record the Lighthouse value and identify any long tasks before claiming an improvement. |
| Initial transferred page weight | Record baseline; reduce avoidable bytes | Not measured | Not measured | Measure from the same production page/network capture. The repository contains `public/assets/Addis Eats.png` at 332,584 bytes; this file size alone is not the delivered page weight. |

## How to collect comparable evidence

1. Deploy a production build and write down its URL and commit.
2. Run Lighthouse on the same route, using the same mobile profile and settings before making the optimization.
3. Save the report and record its date, score, LCP, INP if available, CLS, TBT, and transferred bytes in the Baseline column.
4. Make one documented optimization at a time, deploy the updated production build, and repeat the same measurement.
5. Fill the After optimization column and describe the report evidence that explains the change. If a value gets worse, record that too.

## Current optimization evidence

The app uses `next/image` for the header logo and Next's font integration in the root layout. These are implementation choices, not proof of a faster page. No optimization should be described as successful until a comparable before/after production measurement supports it.




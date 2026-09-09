# PHPTravELS Bug Report

## Triage Status

**Status:** Candidate defect requiring product-owner confirmation

The latest post-remediation Playwright run did not produce a confirmed application failure: 15 executable tests passed and 1 authenticated test was skipped because sandbox credentials were unavailable. The issue below is reported for triage because direct access to the observed accommodation route returned HTTP 404, but the product contract does not yet confirm whether `/hotels` is a supported public route.

## Bug Title

Direct accommodation route `/hotels` returns HTTP 404 instead of an accommodation search or supported redirect

## Module

Accommodation discovery and routing

## Environment

- Application: https://phptravels.net/
- Browser: Chromium
- Playwright: 1.63.0
- Operating system: Windows
- Test command: `npx playwright test tests`
- Test case: `ACC-001: direct hotel route behavior is documented`
- Observation date: 2026-09-08

## Preconditions

- Network access to the public PHPTravELS site.
- No authenticated session required.
- Open a new browser context with no prior application state.

## Steps to Reproduce

1. Open a new browser context.
2. Navigate directly to `https://phptravels.net/hotels`.
3. Record the HTTP response status and rendered page.

## Expected Result

One of the following product-defined outcomes should occur:

- The accommodation search page loads successfully; or
- The user is redirected to the supported accommodation-search route; or
- A documented not-found page provides a valid accommodation entry path.

## Actual Result

The direct `/hotels` request returned HTTP 404 during the observed inspection. The direct path did not provide the expected accommodation search experience.

## Severity

Medium, pending confirmation that `/hotels` is an intended public route.

## Priority

P2, pending route-contract confirmation.

## Reproducibility

Unknown. The route was observed returning 404 during the recorded inspection, but a repeat execution should be performed before assigning an Always classification.

## Impact

Users or integrations that rely on the direct `/hotels` URL cannot reach accommodation search through that path. Search-engine links, bookmarks, campaign links, or external navigation may lead to a dead route.

## Evidence

- The test plan and test case identify accommodation discovery as a required user journey.
- The test report analysis records the direct `/hotels` response as HTTP 404.
- The test source preserves the response as a known route-gap annotation.
- The Playwright report artifacts are available under `playwright-report/`.
- The structured `test-results/results.json` artifact was unavailable during report generation.

## Recommended Next Action

Confirm the canonical accommodation route with the product owner or application routing contract, then either close this report as Not a Bug or promote it to a confirmed P2 defect with a required redirect or working search page.

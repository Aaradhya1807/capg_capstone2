# PHPTravELS Playwright Code Review

## Findings

| Severity | File | Problem | Recommendation |
| --- | --- | --- | --- |
| High | `tests/authentication/session.spec.ts` | Logout is optional, so the test can pass without verifying logout. | Require the logout control and assert protected-route invalidation. |
| High | `tests/security/baseline.spec.ts` | The protected-route test never opens a protected route. | Add a known protected route or API endpoint and assert redirect/401/403. |
| Medium | `tests/flights/search.spec.ts` | Flight fixtures are discarded and no valid search is submitted. | Fill controls from fixtures and assert results or a documented response. |
| Medium | `tests/authentication/login-signup.spec.ts` | Body-wide text checks can match unrelated page content. | Assert field-level errors and accessible validation state. |
| Medium | `tests/helpers/phptravels.ts` | The modal helper can return before a late modal appears. | Align modal handling with a page-level fixture or actionable page contract. |
| Low | `playwright.config.ts` | Only Chromium is enabled while the plan describes cross-browser coverage. | Enable browsers intentionally or document Chromium-only scope. |

## Coverage Gaps

- No implemented valid accommodation search or result assertion exists.
- No implemented booking review, payment, confirmation, cancellation, or duplicate-submission test exists.
- Currency and language behavior is not automated.
- Security coverage does not exercise CSRF, session fixation, cross-user authorization, or rate limiting.

## Positive Practices

- Tests use Playwright role and accessible-name locators for primary controls.
- Credentials are environment-driven rather than hard-coded.
- The demo modal workaround is centralized in a helper.

## Code Quality Score

**5/10**

## Top Improvements

1. Make each test assert the behavior named in its title.
2. Implement protected-route authorization and mandatory logout verification.
3. Replace body-wide assertions with field-specific accessible validation assertions.
4. Separate live smoke tests from mocked or seeded regression tests.

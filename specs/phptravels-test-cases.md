# PHPTravELS Thorough Test Cases

| Test ID | Scenario | Priority | Automation |
| --- | --- | --- | --- |
| NAV-001 | Home page loads over HTTPS | P0 | Yes |
| NAV-004 | Services and Company menus open and close | P1 | Yes |
| FLT-001 | Valid one-way flight search | P0 | Yes |
| FLT-002 | Valid round-trip flight search | P0 | Yes |
| FLT-003 | Valid multi-city flight search | P1 | Yes |
| FLT-005 | Required flight fields are validated | P0 | Yes |
| ACC-001 | Supported accommodation route opens | P0 | Yes |
| ACC-002 | Valid accommodation search | P0 | Yes |
| AUTH-002 | Login empty and malformed fields | P0 | Yes |
| AUTH-004 | Successful login with sandbox user | P0 | Yes |
| AUTH-010 | Logout invalidates access | P0 | Yes |
| BOOK-002 | Booking review precedes payment | P0 | Yes |
| A11Y-001 | Keyboard navigation covers primary flows | P1 | Yes |
| SEC-002 | Unauthenticated protected routes are denied | P0 | Yes |

Authentication, booking, payment, notification, and cross-user cases require approved non-production data. Never use production credentials or real payment details.

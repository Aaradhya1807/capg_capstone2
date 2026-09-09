# PHPTravELS Web Application Test Plan

## Coverage

The plan covers smoke and navigation, currency and language preferences, flight search, accommodation discovery, results and booking continuation, authentication, account protection, resilience, security, accessibility, and responsive behavior.

## Priority Flows

1. Load the home page and verify shared navigation.
2. Search valid one-way, round-trip, and multi-city flights.
3. Reject missing fields, invalid dates, incomplete legs, and invalid quantities.
4. Enter accommodation search through the supported route and validate results.
5. Verify Login, Signup, session persistence, logout, and protected-route behavior.
6. Verify loading, empty, unavailable, timeout, and service-error states.
7. Verify keyboard navigation, labels, focus, responsive layouts, and HTTPS.

Tests requiring inventory, identity, payment, email, or booking state must use approved fixtures, mocks, or sandbox services. The default browser project is Chromium.

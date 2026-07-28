# Shotkut QA & SEO Report

## Bug 1 – Abrupt Page Transition on Mobile Navigation

**Category:** UI / User Experience  
**Environment:** Mobile Device

### Steps to Reproduce
1. Open the website on a mobile device.
2. Navigate from one page/video to another.
3. Observe the screen while the next page loads.

### Expected Result
A loading indicator (spinner/skeleton) or smooth page transition should be displayed until the new content is ready.

### Actual Result
The current page briefly scrolls/flashes before the new page loads. No loading state or transition is shown, making the navigation feel abrupt.

**Severity:** Medium

### Suggested Fix
Show a loading spinner, skeleton, or transition animation while fetching the next page.

---

## Bug 2 – Loading Indicator Completes Before Content is Fully Rendered

**Category:** UI / User Experience  
**Environment:** Desktop Browser

### Steps to Reproduce
1. Open the website on a desktop browser.
2. Scroll until the next batch of content loads.
3. Observe the loading indicator and the newly loaded content.

### Expected Result
The loading indicator should remain visible until the newly fetched content, including images, has finished rendering.

### Actual Result
The loading indicator (cart icon) disappears almost immediately after the API response is received, even though some images and content from the newly loaded section are still loading. This creates a brief period where the page appears partially rendered.

**Severity:** Low

### Suggested Fix
Keep the loading indicator visible until the newly loaded content has been fully rendered. This can be achieved by synchronizing the loading state with image loading events or delaying the loader until all essential content is ready.

---

## Bug 3 – Sensitive Authentication Information Logged in Browser Console

**Category:** Security

### Steps to Reproduce
1. Log in with a valid account.
2. Open the browser Developer Tools.
3. Go to the **Console** tab.
4. Observe the logged information.

### Expected Result
Authentication tokens and sensitive authentication-related information should not be logged in the browser console.

### Actual Result
The application logs the access token and authentication-related information in the browser console after login.

### Impact
Sensitive authentication information should not be exposed through browser console logs, especially in production environments, as it may be visible during debugging, screen sharing, or on shared systems.

**Severity:** Medium

### Suggested Fix
Remove all production `console.log()` statements containing authentication tokens or sensitive user information. Only log non-sensitive information during development.

---

# SEO Improvement

## Observation

The website is indexed by Google, but its search result can be improved by using a more descriptive page title and meta description.

## Recommendation

- Use a descriptive page title containing important keywords.
- Add a clear and informative meta description.
- Ensure every important page has a unique title and meta description.

## Why this helps

A better title and meta description improve search visibility and can increase the click-through rate from search results.

---

## Technical SEO Recommendation

Verify that every important page includes:

- Canonical tag
- Robots meta tag
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Image `alt` attributes where applicable

These help search engines better understand the website and improve how pages appear when shared on social media.

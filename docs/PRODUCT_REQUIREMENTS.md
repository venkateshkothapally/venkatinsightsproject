# Venkat Insights — Product Requirements & AI Implementation Brief

> Living product brief for the Venkat Insights website. This document records requested scope; it does not claim that every feature is already implemented. Inspect the repository before changing code.

## 1. Product overview

**Product:** Venkat Insights  
**Website:** https://venkatinsights.in

Build a responsive, trustworthy portal that brings together government services, education and exam resources, career opportunities, newspapers, articles, practical browser tools, and a curated AI-tools directory. Support both Telugu and English audiences. Prioritize clarity, reliable sources, mobile usability, accessibility, and maintainable content management.

## 2. Product goals

- Make important government, education, and career resources easy to discover.
- Organize Telugu and English newspapers/e-papers and published articles.
- Offer useful browser-based utilities where technically and legally appropriate.
- Provide a searchable AI-tools catalogue designed to scale to 80+ entries.
- Allow authorized administrators to maintain content without editing application code.
- Maintain a consistent, accessible experience on desktop, tablet, and mobile.
- Build sound foundations for security, performance, SEO, and future growth.

## 3. Main navigation and pages

1. **Home** — featured services, recent articles, job updates, useful tools, and important notices.
2. **Government Services** — categorized public-service links and guidance.
3. **Education & Exams** — admissions, notifications, applications, hall tickets, results, scholarships, and student resources.
4. **Newspapers & Articles** — English and Telugu newspapers/e-papers plus published articles.
5. **Career / Jobs** — government and private opportunities, organized by sector and qualification.
6. **Useful Tools** — image conversion/resizing and supported audio/document utilities.
7. **AI Tools** — searchable catalogue of AI products organized by use case.
8. **About** — platform purpose, contact/editorial information, and site policies.

Keep navigation clear and uncluttered. Use an accessible mobile navigation pattern and maintain consistent navigation across pages.

## 4. Shared UI and experience

### 4.1 Design system

- Use a clean, modern visual system with consistent spacing, typography, cards, forms, tables, and dialogs.
- Use responsive CSS grid/flex layouts and prevent horizontal overflow on small screens.
- Support **global light and dark themes** on every page, including menus, dialogs, tables, and form controls.
- Persist the selected theme using the project's existing preference approach. Where practical, respect the operating-system theme on first visit.
- Use fixed/sticky navigation only when it does not obscure content; account for scroll offsets.
- Provide visible keyboard focus, sufficient color contrast, descriptive labels, and helpful loading, empty, success, and error states.
- Ensure dialogs are mobile-friendly and keyboard accessible.

### 4.2 Universal search

Provide a site-wide search across enabled published content:

- Government services
- Education and exam resources
- Jobs and career listings
- Newspapers and articles
- Useful tools
- AI tools

Expected behavior:

- Show categorized results with a title and short preview.
- Highlight matching text when it improves scanning.
- Open the relevant detail page or external destination.
- Support keyboard navigation and Enter/Escape behavior.
- Show a helpful no-results state and allow the query to be cleared.
- Debounce input where appropriate and exclude unpublished records.

### 4.3 Trust and freshness

- Prefer official government or organization sources for applications, notifications, and results.
- Show source and published/updated dates for time-sensitive information.
- Never invent vacancies, deadlines, eligibility criteria, fees, statistics, or official URLs.
- Distinguish editorial guidance from official announcements.
- Mark expired or archived opportunities clearly.

## 5. Functional modules

### 5.1 Government Services

Organize entries by department, purpose, and audience. A service record should support:

- Stable ID and service title
- Department/category
- Short description and verified eligibility guidance
- Required documents, only when verified
- Official information URL and application URL
- Last-verified/updated date
- Publication state: draft, published, or archived

Use an administrator-managed data source rather than hard-coding all service records into page components. Make external destinations clearly identifiable.

### 5.2 Education & Exams

Support admissions, entrance exams, notifications, applications, hall tickets, results, scholarships, and student resources. Each record should include a title, category, summary, relevant dates, source, official URL, and publication state.

### 5.3 Career / Jobs

Provide filters for sector, qualification, location, organization, and application status. Include relevant categories such as:

- Railways and banking
- Defence and DRDO
- NTPC and other public-sector organizations
- Mining and SCCL-related opportunities
- Teaching and education
- Municipal and other government recruitment
- Relevant private-sector opportunities

Recommended job fields:

- Job title and recruiting organization
- Sector/category and job type
- Qualification and experience requirements
- Location
- Vacancy count, only when confirmed
- Salary/pay scale, only when confirmed
- Application opening and closing dates
- Official notification URL and application URL
- Source, last-verified date, and status

Support filtering and sorting. Highlight closing dates and label expired listings.

### 5.4 Newspapers & Articles

Separate this module into two clear views:

**Newspapers & e-Papers**
- Separate English and Telugu sections.
- Store publication name, language, edition/region, and official reading link.

**Published Articles**
- Provide calendar/date-wise browsing, category filters, and individual article pages.
- Support title, slug, summary, body, language, category, tags, author/byline, cover image, publication date, updated date, SEO title/description, and publication state.

Link to publisher-authorized newspaper/e-paper destinations. Do not host copyrighted editions without the required permission.

### 5.5 Useful Tools

Create a catalogue of browser utilities, initially prioritizing:

- Image format conversion
- Image resizing and compression
- Supported audio conversion
- Supported document conversion

Each tool should explain its purpose, supported formats, and usage. Validate file types and sizes, handle failures safely, and disclose whether processing happens in the browser or on a server. Minimize retention of uploaded files and disclose server-side processing.

### 5.6 AI Tools catalogue

Build a searchable directory designed to scale to 80+ entries. Suggested categories include writing, coding, design, image, video, audio, productivity, education, research, and business.

Each entry should include tool name, category, concise description, official website URL, pricing label only when verified, and a last-reviewed date. Identify external services clearly and do not imply endorsement or affiliation unless confirmed.

### 5.7 Admin and content management

Provide a protected admin area for authorized editors, supporting:

- Create, view, edit, publish, unpublish, and archive operations.
- Separate management views for services, education resources, jobs, newspapers, articles, utilities, and AI tools.
- Search, filters, pagination, and validation.
- CSV import/export where appropriate, including preview and validation before import.
- Safe image/file uploads where required.
- Clear timestamps and success/error feedback.

Use role-based access where multiple roles are supported. Never expose admin routes, credentials, or secrets in client-side code.

## 6. Data and architecture guidance

- Prefer a maintainable SQL-backed model for frequently updated content and admin editing.
- Keep domain content models separate, with shared fields for status, timestamps, and source metadata.
- Use stable IDs/slugs and prevent duplicate records.
- Use migrations or the schema-management approach already established by the project.
- Validate all untrusted input on the server, even when client-side validation exists.
- Store credentials and API keys in environment variables. Commit only placeholder variable names in an environment-example file; never commit real secrets.
- Add pagination and suitable database indexes as content grows.
- Isolate external integrations behind small service/helper modules.

**Stack compatibility:** Project discussions have mentioned Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Treat these as hints to verify, not as permission to migrate. Inspect package manifests, lockfiles, and source code before choosing libraries or changing architecture. Preserve the existing stack and conventions unless there is a clear technical reason to change them.

## 7. SEO, analytics, and monetization readiness

- Use meaningful page titles, meta descriptions, canonical URLs, and readable slugs.
- Configure sitemap and robots rules appropriately for the deployed site.
- Use semantic headings and structured content.
- Optimize images, page loading, and Core Web Vitals.
- Publish genuine About, Contact, Privacy Policy, and Terms pages before adding advertising or analytics integrations.
- Ensure ads do not disrupt navigation or content.
- Do not promise search rankings or advertising approval; check the relevant provider's current policies.

## 8. Security, privacy, and reliability

- Use established authentication and authorization patterns for admin features.
- Protect write operations and enforce permissions server-side.
- Sanitize untrusted rich text and validate uploaded files.
- Apply reasonable upload limits, rate limiting, and abuse protection where appropriate.
- Avoid collecting or storing unnecessary personal information.
- Never commit access tokens, passwords, private keys, production data, or user-uploaded documents.
- Log useful diagnostics without recording secrets or unnecessary personal data.
- Provide robust loading/error states and a custom not-found page.

## 9. Suggested implementation roadmap

### Phase 1 — Repository audit and foundations

Inspect the complete project, identify the framework and routes, map reusable components, check build/test scripts, and record existing behavior. Fix existing build/runtime issues before large feature additions. Review working pages before replacing them.

### Phase 2 — Shared UI and navigation

Establish responsive layout, typography, global theme switching, navigation, reusable cards, forms, tables, dialogs, and accessible feedback states.

### Phase 3 — Public content modules

Implement Government Services, Education & Exams, Career/Jobs, Newspapers & Articles, Useful Tools, and AI Tools with consistent data models and reusable listing/detail patterns.

### Phase 4 — Database and admin

Introduce or complete the SQL-backed content layer, migrations, authentication/authorization, CRUD screens, and validated CSV workflows. Seed only verified sample content.

### Phase 5 — Search, SEO, and integrations

Connect universal search to published content, add metadata/sitemap/robots support, optimize performance, and add approved external services only where needed.

### Phase 6 — Quality assurance and release

Test mobile/desktop layouts, keyboard navigation, theme consistency, forms, filters, search, admin permissions, file handling, external links, and error states. Run the repository's lint, type-check, test, and production-build commands before deployment.

## 10. Definition of done

A feature is ready only when:

- It works with the actual repository stack and follows existing conventions.
- It is responsive and keyboard/screen-reader accessible.
- Loading, empty, success, and failure states are handled.
- Inputs and server operations are validated and permission-checked.
- Relevant content sources and dates are shown.
- No secrets or private user data are committed.
- Relevant lint, type-check, tests, and production build pass, or pre-existing failures are accurately documented.
- Setup, environment variables, schema, and workflows are documented when changed.

## 11. Instructions for AI coding assistants

When working in this repository:

1. Read this brief and inspect the existing code before proposing changes.
2. First summarize the current architecture, routes, data flow, and important existing issues.
3. Work in small, coherent steps. Extend existing components rather than replacing the application wholesale.
4. Do not claim a feature is implemented until the code and relevant behavior have been checked.
5. Do not fabricate official content, deadlines, statistics, external URLs, or test results.
6. Ask for configuration values only when genuinely required; use safe placeholders in examples.
7. After changes, list files changed, explain behavior, and report commands/tests actually run and their results.
8. Keep this document aligned with approved product decisions; do not silently remove requirements.

---

**Maintainer note:** This is a living requirements document. Update it when the project owner confirms a meaningful change in product scope, data structure, architecture, or release priorities.
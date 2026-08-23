# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
[ASSUMED — no answer mechanism was exercised before building; user brief said "auto mode."] Static HTML/CSS/vanilla JS, no build step. Reasoning: single landing page, no dynamic data, no forms/backend, needs to be fast-loading and trivially deployable to any standard trade-business hosting (cPanel, Netlify, etc.) without a build pipeline.

## Users
Homeowners and business/property owners across North East England who need flat roofing work — new installation, replacement, repair, or maintenance — plus adjacent fascia/soffit/guttering work. Situation ranges from planned improvement (extension, garage, outbuilding roof) to urgent problems (leaks, storm damage). Job to be done: quickly identify a trustworthy, experienced local roofer and get in direct contact (phone/text/email) for a free quote, without filling in a form or waiting for a callback.

## Product Purpose
The site exists purely to convert visitors into direct phone calls, texts, or emails to Andy Hutchison. It is not a lead-capture funnel — no forms, no data collection, no booking system. Success = a visitor who lands on the page understands within seconds that AHRoofing North East is a trustworthy, experienced flat-roofing specialist, and takes one of three direct contact actions.

## Positioning
Owner-operated flat-roofing specialist with 30+ years of hands-on experience across the North East, competing against larger, less personal roofing contractors and against generalist builders who treat flat roofing as a sideline. The claim a competitor can't copy-paste: direct, no-form access to the owner himself (Andy), not a call centre or office junior.

## Operating Context
[ASSUMED] Andy operates as a sole trader / small owner-led outfit, personally handling enquiries, quoting, and site visits. Contact channels are his personal phone number and business email; there is no office, receptionist, or CRM implied by the brief. Quotes are free and given directly by Andy, not via an online estimator.

## Capabilities and Constraints
- No contact/lead-capture forms anywhere on the site — confirmed hard constraint from the brief.
- No newsletter sign-up, no user accounts, no appointment booking form.
- All conversion paths route through `tel:`, `sms:`, and `mailto:` links only.
- Real phone number: 07538 479411. Real email: info@ahroofingnortheast.co.uk.
- Coverage area: North East England (specific towns not enumerated in brief — copy should say "North East" generally rather than inventing a town list).
- Services confirmed by brief: flat roofing (new install, replacement, repair, maintenance, waterproofing, insulation upgrades, rooflights/skylights, flashing/detailing, drainage), fascias/soffits/guttering, chimney repairs, leadwork, roof inspections/condition reports/surveys, moss removal, roof cleaning, insurance repairs, emergency storm damage repairs.

## Brand Commitments
- Business name: AHRoofing North East. Owner: Andy Hutchison.
- Personality: trust, experience, reliability, professionalism, quality workmanship, honest advice, local expertise — "premium local trades business with an excellent reputation built over many years."
- Pinned visual constraints from brief (binding, recorded here per instruction not to expand them during init; full system decided in DESIGN.md): Deep Navy #0F2D52, White, Light Grey backgrounds, Orange #F28C28 for buttons/highlights; clean modern with generous white space, rounded corners, soft shadows, subtle animation; premium without being flashy.
- Tagline usage: "Flat Roof Specialists."

## Evidence on Hand
- No real customer testimonials, logo, or photography exist yet. The brief explicitly asks for "realistic testimonial cards" with "realistic placeholder names" — these are knowingly fictional illustrative content requested by the user, not fabricated evidence presented as real; they must read as representative rather than verifiable, and are flagged to the user as placeholders to swap for real reviews.
- No logo file provided — site will use a wordmark/lettermark treatment until a real logo is supplied.
- No real photography provided — stock photography of flat roofing, roofers at work, and North East-style homes will be sourced and must be swapped for the business's own project photos when available.
- Owner portrait: placeholder only (no real photo of Andy Hutchison provided).

## Product Principles
1. Every scroll section ends in a direct contact action (call, text, or email) — there is no dead end without a next step.
2. Never introduce a form, account, or booking flow, no matter how natural it would feel to add one for "convenience."
3. Trust is built through specificity (30+ years, owner-operated, named individual) and repetition of proof (badges, testimonials, credentials) near every CTA, not through generic trade-site filler copy.
4. Speed and clarity beat cleverness — this is a Persuade surface for a visitor who may be dealing with an active leak; nothing should slow down finding the phone number.
5. All placeholder content (testimonials, portrait, stock photography) is clearly the user's to replace with real assets before launch; it is authored at production fidelity, not left as grey boxes.

## Accessibility & Inclusion
[ASSUMED — no explicit standard given.] Target WCAG 2.1 AA baseline: sufficient color contrast (notably orange-on-navy and orange-on-white button text), full keyboard operability, visible focus states, semantic landmarks/headings, alt text on all imagery, and accordion/FAQ controls operable via keyboard and screen reader.

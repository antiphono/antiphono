# Site structure and content decisions

**5 August 2026**

## Positioning

The site positions Antiphono as a studio that uses AI as its working method to design any product. It does not position Antiphono as a studio specialising in designing AI products.

Rejected because the AI-native positioning is a narrower market, competing against research heavy specialists with no published evidence on our side. AI feature design remains a service, and it was delivered on Hearsay in 2024.

## Structure

Navigation: Work, Services, How we work, Thinking, About, Get in touch. Research reports moved to the footer.

Services was the missing page. The old site listed five services on the home page linking nowhere.

Services group into three families: research and design, build and measurement, setting your team up. The first is what clients arrive wanting, the third is where they end up, and both are sold from day one. That is the adoption path without needing to write a manifesto about it.

## Case study URLs

Moved from `/work-project?slug=x` to `/work/x`. Query string URLs cannot carry per page metadata reliably, produce no clean share link and index poorly. 301 redirects added.

Case study pages are static HTML rather than JavaScript rendered, so each carries its own title, description and share image. The gallery stays data driven because it needs sorting and filtering.

## Content management

No CMS. Content lives in the repository and is managed through Claude Code. A CMS is a product with authentication, image upload, storage and backups, and it sits between the business and a launch date. Keystatic can be added later over the same files if an admin screen is wanted.

Images live in an image service, not the repository.

## Services

Brand design excluded as a current service, despite being delivered on BeautyCrew in 2018. It pulls against the rest of the offer and attracts the wrong enquiries. Described in the BeautyCrew case study as context, not tagged as a service.

A controlled service vocabulary was introduced because nine overlapping labels across four case studies would fragment the gallery filter. Platform strategy folds into product strategy. Data strategy folds into analytics and measurement. Product, UX and UI design stay separate because clients search for them separately.

## Counters

Four counters: people we have researched with, client platforms we measure in, features tested in production, decisions on the record.

"Elements built" was proposed and dropped. Volume of output is the claim every AI shop already makes, it invites comparison against build shops, and it inflates easily. "Decisions on the record" replaced it because it is the compounding argument made countable and a competitor undercutting on rate starts that number at zero every time.

Surveys excluded from the participant count. One survey of two thousand makes the number large and cheap.

Placeholder values are invented and carry a visible warning label until real figures replace them.

## Removed from the old site

Invented statistics: 52 products shipped, 9 years operating, 120+ research studies, 14 specialists. The team is one person.

A team section describing two unfilled contract roles as though they existed.

A three stage process on the home page that contradicted the four stage process elsewhere.

## Confidentiality

The rebrand is not announced. Every page carries `noindex, nofollow` and `robots.txt` disallows everything until Ben says otherwise.

GroupTogether and Future Women can be named in case studies but are kept out of general site copy. A presentation preference, not a confidentiality restriction.

## Unresolved

Billing model. The recorded July 2026 decision was to move from hourly billing to retainers, because under hourly billing efficiency reduces revenue. Ben's current direction is time and materials with rates shaped per project. The recommendation on the table is to keep flexible rates but quote committed blocks up front rather than invoicing hours after the fact. Nothing on the website depends on this.

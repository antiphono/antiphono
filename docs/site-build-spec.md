# Antiphono: Complete Site Build Specification

**INTERNAL ONLY. Hand this document to Claude Code in full.**
**Version 1.0. 5 August 2026.**

---

## Part 0: How to use this document

This is the single source for building the Antiphono website. It contains the business context, the site structure, the copy for every page, the SEO and AEO requirements, the internal linking design, the interface changes needed and the accessibility standard.

**Order of work:**

1. Part 2 and Part 9 first. Fix the existing site so it can hold the new content.
2. Part 4. Build the shared components once.
3. Part 5. Build the pages.
4. Part 6. Build the case study template and the four launch case studies.
5. Part 7 and Part 8 applied throughout, not bolted on at the end.
6. Part 11 before anything goes live.

**Everything in Part 1 is a rule, not a preference.** Copy that breaks a Part 1 rule is wrong even if it reads well.

---

## Part 1: Context and rules

### 1.1 The business

Antiphono is a product design and research studio in Sydney, Australia, working with technology businesses anywhere in the world. It is the rebrand of BT Digital, an established UX and product design business operating since 2018. Founded and led by Ben Tweedie, Founder and Product Lead.

The business sells one continuous process: from a problem statement, through research, design, working prototypes and testing, to a measured result in production. A governed design system sits underneath it. A project record accumulates as the work happens.

**Who it sells to.** Small and medium technology businesses with a product and some funding, not yet large enough to justify an internal UX or product team.

**The team is one person.** Two contract roles are planned but unfilled. Never describe them as if they exist.

### 1.2 Positioning rules

1. **Lead with the outcome, method second.** Never open a page with technology.
2. **Be transparent about where AI is used and where it is not.** Say plainly which parts are AI assisted and which are human judgement.
3. **Never say or imply that AI does our research.** Humans run interviews and make the calls. AI compresses synthesis, production and documentation.
4. **Never frame efficiency as a discount.** The gain shows up as more scope, more testing and more evidence for the same money.
5. **Lead with platform categories, then name examples.** "Agentic coding tool", then Claude Code. "Analytics and behaviour platform", then GA4 and Contentsquare.
6. **No invented numbers, ever.** No percentages, cycle times or case study figures unless they are real and sourced.
7. **Any claim about speed arrives with its quality control.** Review gates, the design system, human sign off.
8. **Never imply Antiphono replaces a client's development team** or deploys to their production environment.

### 1.3 Voice

Expert but relaxed. A senior person explaining something technical to a smart client over coffee. Confident, never salesy, never breathless.

**Hard rules:**

- Australian English throughout. Organisation, recognise, colour, behaviour, analyse, optimise.
- **No em dashes anywhere.** Use commas, full stops, colons or brackets.
- Short sentences. Plain verbs. Specific nouns.
- Headings as clear as body copy. A heading that sounds impressive but says nothing is worse than a plain one.
- **Banned words:** leverage, unlock, seamless, cutting edge, revolutionise, supercharge, game changing, best in class, synergy, holistic, empower, transform (as a noun), robust, journey (unless it is literally a user journey).

**The clarity test.** Every heading must be understandable on first read by a technically literate client with no design background.

### 1.4 Confidentiality

The rebrand has not been announced publicly. **Every page ships with `<meta name="robots" content="noindex, nofollow">` until Ben removes it.** See Part 11.

GroupTogether and Future Women may be named in case studies only. Do not name them in general site copy.

---

## Part 2: Technical constraints

The site is a plain static site. Do not change this.

- **HTML.** Static `.html` files served directly.
- **CSS.** One custom `styles.css`. No Tailwind, no Bootstrap, no CSS framework.
- **JavaScript.** Vanilla only. `script.js`, `render.js`, `data.js`.
- **Node.** A light `server.js` serving static files and proxying an RSS feed.

**No React, no Vue, no bundler, no build step, no npm dependencies beyond what `server.js` already uses.**

Page body content lives in HTML, not injected by JavaScript. JavaScript is for the gallery, the counters, the navigation and interaction only. If JavaScript fails, every page must still be readable.

---

## Part 3: Site map and URLs

| URL | Page | Status |
|---|---|---|
| `/` | Home | Rebuild |
| `/services` | Services | New |
| `/how-we-work` | How we work | New, replaces the buyer-level role of `/ai-enabled-design` |
| `/how-we-run-a-project` | Technical detail | New. Receives the deep content from `/ai-enabled-design` |
| `/work` | Case study gallery | Rebuild |
| `/work/[slug]` | Individual case study | New URL structure |
| `/articles` | Thinking | Keep, restructure |
| `/articles/[slug]` | Article | Keep |
| `/reports` | Research reports | Keep |
| `/ai-data-and-ip` | AI, data and your IP | New |
| `/about` | About | New |
| `/contact` | Contact | New, replaces the `#book` anchor |

### 3.1 URL changes

**Current case study URLs use a query string:** `/work-project?slug=policyfly`. This is bad for search indexing, produces no clean share link and cannot carry per-page metadata reliably.

**Change to:** `/work/policyfly`

Add redirects in `server.js` from the old query string form to the new path, permanent (301). Serve `/work/policyfly` from `/work/policyfly.html`.

**Also change:** `/ai-enabled-design` stays live and 301s to `/how-we-run-a-project` once that page exists. Do not delete it. It is currently shared directly with clients.

### 3.2 Files to add

```
/services.html
/how-we-work.html
/how-we-run-a-project.html
/about.html
/ai-data-and-ip.html
/contact.html
/work/index.html
/work/beautycrew.html
/work/policyfly.html
/work/hearsay.html
/work/winter-olympics-on-7.html
/content/metrics.json
/sitemap.xml
/robots.txt
/llms.txt
```

---

## Part 4: Shared components

Build these once in `styles.css` and `render.js`. Every page uses them.

### 4.1 Header navigation

**Items:** Work · Services · How we work · Thinking · About · **Get in touch** (button style)

Rules:
- Current page marked with `aria-current="page"` and a visible state.
- Mobile: a disclosure button with `aria-expanded`, full screen panel, focus trapped while open, Escape closes it.
- Not sticky on scroll for standard pages. Sticky only where a section navigation is present (see 4.2).
- Logo links to `/` and carries the accessible name "Antiphono, home".

Research reports move out of the top navigation and into the footer.

### 4.2 Section navigation, for long pages

`/how-we-work`, `/how-we-run-a-project` and each case study are long. Each needs an in-page section navigation.

- Horizontal on desktop, sits below the header and sticks on scroll.
- Collapses to a single dropdown on narrow viewports.
- Highlights the current section using `IntersectionObserver`.
- Links are real anchors to real `id` attributes, working with JavaScript disabled.
- Smooth scroll only when `prefers-reduced-motion` is not set.

The existing `/ai-enabled-design` page already has a working version of this. Reuse that pattern.

### 4.3 Related content block

**This is the most important navigation component on the site and it must appear on every page.** Top navigation moves people between sections. This moves people between related ideas, which is what keeps them reading and what search engines read as topical structure.

```
.related
  .related__heading      short, contextual, e.g. "Where this shows up in the work"
  .related__items        2 to 4 cards
    .related__card
      eyebrow    what kind of thing it is: Case study, Service, Article
      title      the destination
      line       one sentence on why it is relevant here
```

Rules:
- Two to four items. Never one, never five.
- The one sentence explains the connection, not the destination. "The design system work on this project ran for four years" beats "Read the PolicyFly case study".
- Links must use descriptive text, never "read more" or "click here".
- Mixed types are good. A services page linking to a case study and an article is stronger than three services.

The exact links for each page are in Part 8.

### 4.4 Breadcrumbs

On every page except the home page. Marked up with `BreadcrumbList` JSON-LD (Part 7.4).

```
Home / Work / PolicyFly
Home / Services
```

### 4.5 Counters

See Part 6.4.

### 4.6 Footer

Three columns.

**Navigate:** Work · Services · How we work · Thinking · Research reports · About · Contact
**Position:** AI, data and your IP · Accessibility · How we run a project
**Contact:** ben@antiphono.com · LinkedIn

Rules:
- **The email is `ben@antiphono.com`.** The current site shows `hello@antiphono.studio` in several places. Replace every instance.
- LinkedIn is `https://www.linkedin.com/in/bentweedie`. Currently `#`.
- **Remove the Instagram link** unless an account exists. Currently `#`.
- One line of entity text: "Antiphono is a product design and research studio in Sydney, Australia."

### 4.7 Call to action block

One reusable block, appearing once per page, above the footer. Never more than once. Copy varies by page and is given in Part 5.

---

## Part 5: Page specifications and copy

Each page below gives the metadata, the heading structure, the copy and the outbound links. **Use this copy. Do not rewrite it.** If something is missing, leave a visible `TODO` comment rather than inventing content.

---

### 5.1 Home, `/`

**Title:** `Antiphono | Product Design and Research Studio, Sydney`
**Meta description:** `Antiphono is a product design and research studio in Sydney. User research, product and UX design, design systems and working prototypes for technology businesses.`
**Primary terms:** product design studio Sydney, product design and research studio, UX design Sydney
**Schema:** `Organization`, `ProfessionalService`, `WebSite`

---

**H1: Product design that reaches production, and gets measured.**

Antiphono is a product design and research studio in Sydney, Australia. We work with technology businesses on research, product and UX design, design systems and working prototypes, and we stay long enough to find out whether it worked.

[Get in touch] [See the work]

---

**H2: Who we work with**

Technology businesses with a product in market, some funding behind them, and no internal design team yet. You need senior product thinking and delivery capability, and hiring for it is a year of work and a salary you are not ready to commit.

We have been doing this since 2018. The studio is small and senior, and the person you meet is the person who does the work.

---

**H2: What has changed about product design**

Production and synthesis used to absorb most of a design budget. Drawing every screen, writing every summary, rebuilding every option someone wanted to compare. That cost has collapsed, and the money it freed up moves into the parts that decide whether a product works.

**H3: Then**

Static mocks handed over for somebody else to interpret. A specification to read between the lines of. Every option redrawn and re-estimated, so one safe idea shipped and everybody hoped.

**H3: Now**

Working software, built from real components. Several directions compared side by side, with real behaviour deciding between them. A new option costs a prompt and a branch instead of a rebuild.

Nothing you relied on has gone. Research, strategy, design craft and judgement all still matter, and they matter more than they did. What changed is how fast the work moves and how much of it accumulates.

---

**H2: What we do**

**H3: Research and design**
User research, product strategy, product design, UX and UI design, AI feature design, prototyping, design systems and accessibility.

**H3: Build and measurement**
Working front end prototypes bound to your design system, with tracking already in place, ready for your development team to take through their own pipeline.

**H3: Setting your team up**
The working method, the design system and the project record installed in your own environment, so more of it runs without us over time.

[See all services]

---

**H2: How we work**

One process, from the problem to the live result.

1. **Design.** Problem statement, research, prototype directions built from live components, one sign off gate before engineering effort is committed.
2. **Build.** Working front end code, built from the design system, with measurement wired in as it is written.
3. **Testing.** Internal review, QA and participant testing, then live variants measured against real traffic.
4. **The record.** Every stage writes what it learned as the work happens, so the next brief starts from evidence rather than memory.

Speed is only useful if the work holds up, so every stage has a gate. A person reviews and signs off before anything moves forward, and accessibility is checked as we go rather than audited at the end.

[How we work in detail]

---

**H2: Selected work**

[Three featured case study cards, rendered from `data.js`]

[See all work]

---

**H2: The numbers behind the work**

[Counter block. See Part 6.4]

---

**H2: How to start**

Most clients start with a discovery. Two to three weeks, scoped and quoted up front. We define the problem properly, build a prototype direction you can click, and give you a plan with a number against it. You own everything it produces, whether or not we do the work that follows.

[Get in touch]

---

**H2: Your data, and what happens to it**

We work inside your own AI accounts, under your subscription and your settings, so your material stays in your environment and nothing of yours sits in our systems. Everything we produce belongs to you.

[Read our position on AI, data and IP]

---

**Related block:** How we work · Services · AI, data and your IP

---

### 5.2 Services, `/services`

**Title:** `Product Design Services | Research, UX, Design Systems | Antiphono`
**Meta description:** `User research, product strategy, product and UX design, design systems, prototyping and testing for technology businesses. Sydney based, working worldwide.`
**Primary terms:** product design services, UX design services, user research, design systems
**Schema:** `Service` items within `ProfessionalService`, `FAQPage`

---

**H1: Product design services**

Everything you would expect from a product design studio. Research, strategy, design, design systems, working prototypes, testing and measurement.

What has changed is how the work gets done. Production and synthesis no longer absorb most of a budget, and that money moves into the parts that decide whether a product works: talking to users, testing more than one direction, and measuring what shipped.

You do not have to change how your team works to hire us. Most clients start with an ordinary piece of product design work. What happens after that is up to you.

---

**H2: Research and design**

**H3: User research**
We interview your users, run usability sessions and analyse how people actually behave in your product. People run the sessions and make the calls. AI helps us get through synthesis and documentation, which means more sessions rather than fewer.

**H3: Product strategy**
What to build, in what order, and why. Including where a product sits across platforms and channels, and what that means for your roadmap.

**H3: Product design**
The shape of the product. Flows, structure, and how the parts fit together.

**H3: UX design**
How people move through it. Information architecture, interaction detail, and the decisions that make a screen work rather than merely look finished.

**H3: UI design**
The surface. Layout, type, colour and state, built from components rather than drawn from scratch each time.

**H3: AI feature design**
Designing AI features people are willing to rely on. Honest about uncertainty, clear about what the system can and cannot do, and always with a way for someone to check the work.

**H3: Prototyping**
Working prototypes rather than static mocks. Real components, real content where we can get it, clickable by your team and testable with your users before anyone commits engineering effort.

**H3: Design systems**
A versioned component library your developers build from, rather than a design file they have to interpret. It lives in your codebase with a changelog anyone can read.

**H3: Accessibility**
WCAG 2.1 AA as standard on everything we design, checked as we go rather than audited at the end.

---

**H2: Build and measurement**

We build working software rather than pictures of it. Your development team takes it from there, through your pipelines and your release process.

**H3: Prototype build**
Front end builds bound to your design system, with tracking already in place, handed over ready for your team to take forward.

**H3: Design system engineering**
Components authored once in design, synced to code, with automated checks on naming, properties and accessibility before anything lands.

**H3: Analytics and measurement**
Tracking specified and implemented at the prototype stage, so a feature is measurable from its first session rather than instrumented after someone asks how it performed. We work with whatever you already run, including tag management, analytics and behaviour platforms such as GA4 and Contentsquare.

**H3: Testing and QA**
Internal walkthroughs, staging QA, accessibility checks and participant testing with real users.

**H3: Live variant testing**
Several versions of a feature running against real traffic at once, so the decision comes from behaviour instead of opinion. When a version wins it becomes the default and the pattern goes into the design system.

---

**H2: Setting your team up**

Most clients eventually want some of this running without us. That is a good outcome and we build towards it rather than against it.

**H3: AI workflow setup**
The working method installed in your own environment. Repository conventions, project instructions and the guardrails that keep quality consistent when more people are producing more work.

**H3: The project record**
Decisions, research and test results written as the work happens and kept in your repository. The reasoning survives people leaving, and a question asked next year gets answered from the record rather than from memory.

**H3: Design system governance**
Ownership, versioning and release process, handed over so the system holds together without us in the room.

**H3: Training and embedded working**
Your designers and product people working inside the method until it belongs to them.

---

**H2: How we work with your development team**

We are not a replacement for your developers and we do not bid against them.

What we produce is working front end code: prototypes and components built from a real design system, with measurement already wired in. What your team does with it is their call, and it changes from client to client.

**H3: We hand over**
You get working prototypes and documented components. Your team builds and deploys from them, their way.

**H3: We work in your repository**
We build on a branch and follow your conventions. Your team reviews, merges and deploys. Nothing reaches production except through your own gates.

**H3: We build the foundations**
The design system, the component library and the production pipeline your team then owns and runs.

Most engagements start with the first and move towards the second. Whichever it is, we do not deploy to your production environment and we do not own your release process. Your developers stay in control of what ships.

---

**H2: Where you start, and where this ends up**

Most clients come to us with something specific. A feature that is not converting, a product that needs research behind it, a design system that has drifted out of shape.

That is the right place to start. The method shows up in the work rather than in a change programme, and you can judge it on the result.

Over time, more of it moves in house. The design system becomes yours to run. The project record accumulates in your repository. Your own team starts working inside the conventions. We stay for the harder problems and the things worth an outside opinion.

You can stop at any point on that path, and plenty of clients would rather we kept doing the work. That is fine too.

---

**H2: What we do not do**

Brand identity from scratch. Native mobile development. Ongoing marketing campaign management. Staff augmentation by the day.

If that is what you need, we will tell you early and point you somewhere better.

> `TODO: Ben to confirm the three items after brand identity.`

---

**H2: How engagements work**

**H3: Start with a discovery**
Two to three weeks. We define the problem properly, build a prototype direction you can click, and give you a plan with a number against it. You own everything it produces, whether or not we do the work that follows.

**H3: A defined piece of work**
Scoped, quoted and delivered end to end.

**H3: Continuous product work**
An agreed amount of our team's time each month, for clients who want design and research capability without hiring for it.

Everything we produce belongs to you. Code, designs, research and the project record live in your repositories and your accounts.

---

**H2: Common questions**

Mark this section up as `FAQPage`. See Part 7.4.

**Do you replace our development team?**
No. We build working prototypes and design system components. Your developers take them through your own deployment process, and we never deploy to your production environment.

**Do you use AI to do our research?**
No. People run the interviews and usability sessions and make the calls about what the findings mean. AI helps with synthesis, documentation and analysis, which means we can run more sessions rather than fewer.

**Where does our data go?**
We work inside your own AI accounts, under your subscription and your settings. Your material stays in your environment and nothing of yours sits in our systems.

**Who owns what you make?**
You do. Code, designs, research, the design system and the project record all live in your repositories and your accounts.

**Do you work with clients outside Australia?**
Yes. We are based in Sydney and work with technology businesses anywhere.

**Can you work with our existing design system?**
Yes. We work with whatever you already run, whether that is an established system, something half built, or nothing yet.

---

**CTA:** Tell us what you are trying to fix. If we are the right people for it, we will say so, and if we are not, we will say that instead.

**Related block:** How we work · PolicyFly case study · AI, data and your IP

---

### 5.3 How we work, `/how-we-work`

**Title:** `How We Work | Design, Build, Test, Record | Antiphono`
**Meta description:** `One process from a problem statement to a measured result. Design, working prototypes, testing with real users, and a project record that compounds.`
**Primary terms:** product design process, design to development process, AI enabled design process
**Schema:** `HowTo` is not appropriate here. Use `WebPage` with `BreadcrumbList`.

Section navigation required (4.2), anchors: `#process`, `#design-system`, `#design`, `#build`, `#testing`, `#record`, `#ai-and-people`, `#what-protects-it`.

---

**H1: How we work**

One process, from the problem to the live result.

Most organisations run a design process and a development process that meet awkwardly somewhere in the middle. The gap between them is where quality leaks and where budgets go. We run one continuous process instead, with a design system governing everything underneath it and each stage writing down what it learned.

---

**H2: The design system underneath** `#design-system`

Authored once in design, synced to code, checked automatically, versioned in its own repository, and loaded by every project that follows.

It is a maintained component library in your codebase, not a design file. Every project starts with it already in place, which is why consistency does not need a person policing it, and why a new team member produces on-brand work in their first week.

[View a live component library]

---

**H2: Design** `#design`

A problem to solve, not a solution to build.

We start with a problem statement, then research it. Interviews, usability sessions, and whatever behavioural data already exists. People run the sessions. AI compresses the synthesis and the write up, which is why we can afford to run more of them.

Then prototype directions, built from live design system components rather than drawn. Usually several in parallel, because comparing options is now cheap enough to be normal.

One sign off gate before engineering effort is committed.

---

**H2: Build** `#build`

Working front end code, built from the design system, with measurement wired in as it is written rather than added afterwards.

We build on a branch, following your repository conventions. Your team reviews and merges. Your pipeline deploys. We do not deploy to your production environment and we do not own your release process.

What you get is working software rather than pictures of it, ready for your developers to take forward however suits them.

---

**H2: Testing** `#testing`

Four stages, and none of them is an upsell.

1. **Internal walkthrough.** The team clicks through directions before anything is built.
2. **Internal review.** The built feature on a real URL, with same day fixes.
3. **QA and user testing.** Regression, accessibility and participant tasks at staging.
4. **Live behaviour.** Variants running against real traffic, measured through your analytics and behaviour platforms.

Because producing a variant is now cheap, testing stops being the thing that gets cut when the timeline tightens. Decisions come from what people did rather than from who argued hardest.

---

**H2: The project record** `#record`

Every stage writes its record as the work happens, stored in your repository alongside the code it describes.

Problem statements and the options considered. Why a direction was chosen and what was rejected. What shipped, when, and what the behaviour showed. It is written while the reasoning is still intact, not reconstructed at the end by whoever has time.

Every future session loads it on start up. A question asked in year two gets answered from the record of year one, in minutes, by whoever is working that day. Month twelve costs less and delivers more than month one, and the reason is sitting in your repository rather than in somebody's head.

---

**H2: Where AI does the work, and where people do** `#ai-and-people`

We think you should know exactly where AI sits in this, so here is the plain version.

**H3: AI does**
Synthesising research material. Producing design and code. Generating options and variants. Writing documentation and change summaries. Analysing test and behavioural data. Keeping the project record current.

**H3: People do**
Deciding what problem is worth solving. Talking to your users. Judging which direction is right. Being accountable for what ships.

Everything that reaches you has been reviewed by a person who is answerable for it.

---

**H2: What protects the work** `#what-protects-it`

Speed is only worth having if the output holds up.

A review gate before engineering effort is committed. A separate, deliberate gate before anything goes live. A governed design system, so consistency is inherited rather than enforced. WCAG 2.1 AA checked as we go. And a named person signing off on everything that reaches you.

---

**CTA:** [Get in touch]

**Related block:** How we run a project · Services · AI, data and your IP

---

### 5.4 How we run a project, `/how-we-run-a-project`

**Title:** `How We Run a Project | Repositories, Pipelines, Records | Antiphono`
**Meta description:** `The technical detail behind our process. Repository conventions, environments, deployment, measurement and how the project record is structured.`

**Content:** Move the existing deep material from `/ai-enabled-design` here. Folder conventions, project instruction files, branch and environment structure, deployment options, the measurement stack, the live demos.

**Changes required to that content when it moves:**

1. Remove the illustrative percentages in the variant comparison, or label them clearly as an example rather than a result.
2. Replace the flagged phrases per Part 1.3. Specifically: "one governed pipeline" becomes "one process, from the problem to the live result". "Product Language Model" becomes "the project record". "Inherited, not policed" becomes "every project starts with the design system already loaded". "Shared, not siloed" becomes "design, product and development all build from the same components". "Fast stops fighting careful" becomes "moving quickly no longer costs control".
3. Remove every em dash.
4. Remove the team section entirely. It describes two people who do not work here. The About page handles the team honestly.
5. Change "Research the problem. Hours rather than weeks. Owner: UX lead, Claude" so it does not imply AI runs research. Owner is the UX lead. AI assists with synthesis.
6. Fix "behavior" to "behaviour".
7. Add a line making clear that deployment happens through the client's pipeline, not ours.

Section navigation required.

**Related block:** How we work · Services · AI, data and your IP

---

### 5.5 Work, `/work`

**Title:** `Product Design Case Studies | Antiphono`
**Meta description:** `Selected product design, UX and design system work for technology businesses, including PolicyFly, Hearsay, BeautyCrew and Winter Olympics on 7.`
**Schema:** `CollectionPage`, `BreadcrumbList`

**H1: Selected work**

One paragraph of intro copy:

> Nine years of product design for technology businesses, media platforms and marketplaces. Some of this work predates the way we work now, and we have said so where it matters.

**Gallery.** Rendered by `render.js` from `data.js`. Cards show thumbnail, client, sector, years and headline.

**Filtering.** By service and by sector. Filter values come only from the controlled vocabulary in Part 6.2. Filters update the URL query string so a filtered view can be shared, and must work as links with JavaScript disabled where possible.

**Sorting.** Featured first, then most recent.

**Related block:** Services · How we work

---

### 5.6 About, `/about`

**Title:** `About Antiphono | Product Design Studio, Sydney`
**Meta description:** `Antiphono is a product design and research studio in Sydney, founded by Ben Tweedie. Established 2018, formerly BT Digital.`
**Schema:** `AboutPage`, `Person` for Ben, `Organization`

---

**H1: About Antiphono**

Antiphono is a product design and research studio in Sydney, Australia. We work with technology businesses on research, product design, design systems and working prototypes, and we stay long enough to find out whether it worked.

The studio has been operating since 2018, previously as BT Digital. The name changed because the work did.

---

**H2: Ben Tweedie, Founder and Product Lead**

Ben leads strategy, client relationships and creative direction, and does the design and prototyping work himself. Clients deal with the person doing the work, which is the main advantage of a studio this size.

[LinkedIn]

> `TODO: Ben to supply two or three sentences of background. Where he worked before, what he has shipped, what he is good at.`

---

**H2: The team**

Antiphono is small and senior by design. There is no junior layer absorbing volume and no margin taken on it.

Two contract specialists are joining during 2026: a senior designer for design and rollout work, and a researcher working on applied AI tooling. Until they start, Ben does the work.

---

**H2: What Antiphono means**

Antiphony is a musical term for call and response. Two voices in dialogue, each shaping the other.

It is the shape of the relationship between human judgement and AI, and it is why the name changed. Design, research and development have shifted in the last two years, and our traditional services, UX design, research, strategy and prototyping, now move at a different speed because of it. Nothing you relied on has gone. What changed is how fast it moves and how much of it compounds.

---

**H2: How we work, and what we hold ourselves to**

WCAG 2.1 AA on everything we design, build or advise on. The Australian Privacy Act for Australian clients and for our own handling of data. GDPR where clients operate in or serve the EU.

Where a project involves personal information, including research participants and analytics, participants are told how their contribution will be used, including any AI assisted analysis, and identifying details are removed before material is processed.

[Read our position on AI, data and IP]

---

**CTA:** [Get in touch]

**Related block:** Services · How we work · AI, data and your IP

---

### 5.7 AI, data and your IP, `/ai-data-and-ip`

**Title:** `AI, Data and Your IP | How We Work With Your Data | Antiphono`
**Meta description:** `Where we use AI and where we do not, how we work inside your own accounts, what happens to your data, and who owns what we produce.`
**Schema:** `WebPage`, `FAQPage` for the question headings

**Source the copy from `Antiphono-AI-and-Data-Position-v2.md`, section 3, unchanged.** It is approved. Break it into H2 sections using the existing bold headings.

Section order:
1. Where AI does the work
2. Where people do the work
3. We work inside your accounts
4. What that means for training and retention
5. Your intellectual property
6. Personal data
7. If you have restrictions

**Blocker:** the publication conditions in section 4 of that document must be met before this page goes live.

**Related block:** How we work · Services · About

---

### 5.8 Contact, `/contact`

**Title:** `Contact Antiphono | Product Design Studio, Sydney`
**Meta description:** `Get in touch with Antiphono. Tell us what you are trying to fix and we will tell you whether we are the right people for it.`

**H1: Get in touch**

Tell us what you are trying to fix. If we are the right people for it we will say so, and if we are not, we will say that instead.

**ben@antiphono.com**

Sydney, Australia. We work with clients anywhere.

> `TODO: confirm whether a form is wanted, or email only. Email only is faster to build and converts fine at this volume.`

Replace every `#book` anchor across the site with `/contact`.

---

### 5.9 Thinking, `/articles` and Research, `/reports`

Keep the existing structure. Two changes:

1. Every article page needs `Article` schema, an author of Ben Tweedie, a published date and a related block.
2. Article and report cards must show a real date. Undated content reads as abandoned.

---

## Part 6: Case studies

### 6.1 Architecture

| Thing | How | Why |
|---|---|---|
| Gallery and home page cards | Objects in `data.js`, rendered by `render.js` | Needs sorting and filtering |
| Individual case study pages | One static `.html` file each | Each needs its own title, description and share image in the HTML |

### 6.2 Index data

```js
const caseStudies = [
  {
    slug: "beautycrew",
    client: "BeautyCrew",
    named: true,
    sector: "Ecommerce and cosmetics",
    yearStart: 2018,
    yearEnd: 2018,
    headline: "",     // TODO Ben
    summary: "",      // TODO Ben
    services: ["Product design", "Product strategy"],
    thumbnail: "",
    featured: false
  },
  {
    slug: "policyfly",
    client: "PolicyFly",
    named: true,
    sector: "InsurTech",
    yearStart: 2018,
    yearEnd: "present",
    headline: "",
    summary: "",
    services: ["UX design", "Product design", "Design systems"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "hearsay",
    client: "Hearsay",
    named: true,
    sector: "SaaS and technology",
    yearStart: 2024,
    yearEnd: 2024,
    headline: "",
    summary: "",
    services: ["Product design", "Product strategy", "AI feature design"],
    thumbnail: "",
    featured: true
  },
  {
    slug: "winter-olympics-on-7",
    client: "Winter Olympics on 7",
    named: true,
    sector: "OTT streaming",
    yearStart: 2018,
    yearEnd: 2018,
    headline: "",
    summary: "",
    services: ["Product strategy", "Product design", "UX design",
               "UI design", "Analytics and measurement"],
    thumbnail: "",
    featured: true
  }
];
```

**Controlled service vocabulary.** Case study `services` arrays draw only from this list, or the filter fragments.

User research · Product strategy · Product design · UX design · UI design · AI feature design · Prototyping · Design systems · Accessibility · Prototype build · Design system engineering · Analytics and measurement · Testing and QA · Live variant testing · AI workflow setup · The project record · Design system governance · Training and embedded working

`yearEnd: "present"` renders as "2018 to present". Make this prominent on the card. A relationship running eight years is the strongest single signal on the page.

`named: false` hides the client name everywhere and shows the sector description instead. Build this now even though all four are named.

### 6.3 Case study page template

Nine sections, same order every time, stable class names.

| # | Section | Class | Required | Contents |
|---|---|---|---|---|
| 1 | Hero | `.cs-hero` | Yes | Full bleed image, client, sector, years, headline |
| 2 | At a glance | `.cs-glance` | Yes | 4 to 6 label and value pairs, horizontal strip |
| 3 | The problem | `.cs-problem` | Yes | 2 to 3 paragraphs, optional client quote |
| 4 | Chapters | `.cs-chapter` | Yes, 3 to 5 | One idea, short body, one dominant visual |
| 5 | The detail | `.cs-detail` | Optional | One deep dive |
| 6 | What happened | `.cs-outcome` | Yes | The result. Numbers only where real and sourced |
| 7 | How it runs now | `.cs-handover` | Yes | What the client's team owns and runs |
| 8 | Client quote | `.cs-quote` | Optional | One quote, attributed, with role |
| 9 | Related | `.related` | Yes | Two case studies plus one service or article |

**Chapter layouts.** Three variants only: `.cs-chapter--full`, `.cs-chapter--split`, `.cs-chapter--sticky`. Use `--sticky` once per case study, on the strongest chapter. It holds the text column while the visual column scrolls, and it loses its effect if repeated.

**Chapter media types:** `image`, `video`, `embed` (an iframe of a live prototype), `comparison` (before and after).

**The detail section.** Four supported types: `embed`, `slider`, `variants`, `annotated`. Build `embed` and `slider` first. Existing deployed prototypes can be embedded directly, and a working prototype inside a case study is worth more than another paragraph.

**Section 7 is not optional and not a footnote.** It must make clear that Antiphono builds working prototypes and design system components which the client's own development team takes through their own deployment process. Never imply Antiphono deploys to a client's production environment.

**Content rules.** 400 to 700 words of body copy total. Plain headings. Australian English. No em dashes. No number without a recorded source.

### 6.4 Counters

Four counters. Data in `content/metrics.json`, read by `render.js`.

```json
{
  "updated": "2026-08-05",
  "placeholder": true,
  "counters": [
    { "id": "participants",
      "label": "People we have researched with",
      "qualifier": "Interviews and usability sessions since 2018. Not surveys",
      "value": 840 },
    { "id": "platforms",
      "label": "Client platforms we measure in",
      "qualifier": "Live analytics and behaviour platforms",
      "value": 14 },
    { "id": "features",
      "label": "Features tested in production",
      "qualifier": "Variations shipped to real traffic and measured",
      "value": 260 },
    { "id": "decisions",
      "label": "Decisions on the record",
      "qualifier": "Written to the project record as the work happens",
      "value": 1450 }
  ]
}
```

**The four values above are invented. They exist to build and test the animation and must not go live.**

While `"placeholder": true`, render a visible amber "Placeholder" label beside the counter group. Removing fake numbers must require a deliberate act rather than remembering.

**Behaviour:**
- Count up animation when the group scrolls into view, once, not on every scroll.
- Render the `updated` date beneath the group as "As at August 2026".
- Never imply a live feed.
- Respect `prefers-reduced-motion`. If set, show the final value immediately.
- If `metrics.json` fails to load, hide the whole section rather than showing zeros.
- Counter values must also be present in the HTML as static text for search engines and for JavaScript-off readers. Animate from the rendered value rather than injecting it.

### 6.5 Images

Not in the repository. Use an image service that transforms on request, so one upload serves every size. Cloudflare Images or Cloudinary. Store an ID or URL, never a local path.

**For now:** use the assets already on the site. Where one is missing, generate a plain neutral block at the correct aspect ratio with the filename visible on it. Do not use stock photography and do not generate decorative imagery to fill space. A visible empty slot is honest and gets replaced. A plausible wrong image does not.

---

## Part 7: SEO and AEO

Search engines index pages. Answer engines quote passages. Both need the same underlying thing, which is content that says what it means in the place a machine expects to find it. Apply all of this as pages are built, not afterwards.

### 7.1 Per page requirements

Every page has:

- One `<h1>`, containing the page's primary term, matching the visible page heading.
- A `<title>` under 60 characters, following the pattern `Primary Term | Antiphono` or `Primary Term | Qualifier | Antiphono`.
- A `<meta name="description">` between 140 and 160 characters, written as a sentence, containing the primary term.
- A `<link rel="canonical">` with the absolute URL.
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- Twitter card tags: `twitter:card` set to `summary_large_image`, plus title, description and image.
- `<html lang="en-AU">`.
- Heading levels nesting properly, no skipped levels, headings used for structure and never for styling.

### 7.2 Writing for answer engines

Answer engines quote self-contained passages. Write so a paragraph lifted out of the page still makes sense.

**Rules for all body copy:**

1. **Answer in the first sentence.** A section under the heading "How we work with your development team" opens by answering it, not by building towards it.
2. **Name the entity, do not rely on pronouns.** "Antiphono builds working prototypes" beats "We build them". Use the full name at the start of major sections, then "we" within them.
3. **One idea per paragraph.** Three to five sentences. Long paragraphs do not get quoted.
4. **Repeat the category definition where it fits naturally.** "Antiphono is a product design and research studio in Sydney" should appear on the home page, the about page and in the footer, worded consistently.
5. **Use question-shaped headings where the content is an answer.** The FAQ sections exist for exactly this.
6. **Never bury a fact in a list of adjectives.** Facts get quoted. Adjectives do not.

### 7.3 Keyword targets

| Page | Primary | Secondary |
|---|---|---|
| Home | product design studio Sydney | product design and research studio, AI product design |
| Services | product design services | UX design services, user research, design systems |
| How we work | product design process | design to development process, design system governance |
| How we run a project | design and development workflow | repository conventions, deployment pipeline |
| Work | product design case studies | UX case study, design system case study |
| About | Ben Tweedie product designer | product design studio Sydney |
| AI, data and IP | AI data privacy design | AI and client data, design studio IP ownership |

Terms appear in the `h1`, the title, the description, the first paragraph and at least one `h2`. They do not appear more often than reads naturally. Copy written to hit a keyword count reads as written for a machine, and answer engines are now good at spotting it.

### 7.4 Structured data

JSON-LD in the `<head>` of each page.

**Every page:** `Organization` and `BreadcrumbList`.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Antiphono",
  "alternateName": "Antiphono Pty Ltd",
  "description": "Product design and research studio working with technology businesses.",
  "url": "https://antiphono.com",
  "email": "ben@antiphono.com",
  "foundingDate": "2018",
  "founder": {
    "@type": "Person",
    "name": "Ben Tweedie",
    "jobTitle": "Founder and Product Lead",
    "sameAs": "https://www.linkedin.com/in/bentweedie"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sydney",
    "addressRegion": "NSW",
    "addressCountry": "AU"
  },
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Product design", "User research", "UX design",
    "Design systems", "AI feature design", "Prototyping"
  ]
}
```

**Services page:** an `OfferCatalog` of `Service` items, one per service in Part 5.2. Plus `FAQPage` for the common questions section.

**Case studies:** `CreativeWork` with `about`, `datePublished`, `author` and `keywords` drawn from the services array.

**Articles:** `Article` with `headline`, `datePublished`, `dateModified`, `author` and `image`.

**AI, data and IP page:** `FAQPage` across the seven sections.

Validate every block. Invalid structured data is worse than none.

### 7.5 Crawl files

**`robots.txt`.** Until launch:

```
User-agent: *
Disallow: /
```

At launch, allow everything and reference the sitemap.

**`sitemap.xml`.** Every indexable page with `lastmod`. Generate it from a list in `data.js` so it cannot drift out of date.

**`llms.txt`** at the site root. A plain markdown file describing the business and linking to the main pages, for answer engines that look for it. Keep it short and factual.

```
# Antiphono

Antiphono is a product design and research studio in Sydney, Australia,
working with technology businesses worldwide. Founded 2018, previously
BT Digital. Founder and Product Lead: Ben Tweedie.

## Services
Research and design, build and measurement, setting your team up.
See https://antiphono.com/services

## How we work
https://antiphono.com/how-we-work

## Work
https://antiphono.com/work

## Contact
ben@antiphono.com
```

### 7.6 Performance

Answer engines and search engines both discount slow pages, and this site has no framework overhead to blame.

- Images: `loading="lazy"` on everything below the fold, explicit `width` and `height` on every image to prevent layout shift, modern formats served by the image service.
- Fonts: `font-display: swap`, preload the primary weight only.
- No render blocking JavaScript. `defer` on all scripts.
- Inline critical CSS only if it is genuinely needed. One stylesheet on a static site is usually fast enough.

---

## Part 8: Internal linking

Top navigation moves people between sections. It does not move them between related ideas, and that is where the value is. Every page needs contextual links in three places: within the body copy, in the related block, and in the call to action.

### 8.1 The linking map

| From | Links to |
|---|---|
| Home | Services, How we work, Work (three featured), AI data and IP, Contact |
| Services, in body | Design systems section links to the PolicyFly case study. AI feature design links to Hearsay. Live variant testing links to How we work. Data ownership paragraph links to AI, data and IP |
| Services, related block | How we work, PolicyFly, AI data and IP |
| How we work, in body | Design system section links to the live component library. Testing section links to Live variant testing on Services. Record section links to How we run a project |
| How we work, related block | How we run a project, Services, AI data and IP |
| How we run a project | How we work, Services, Contact |
| Work gallery | Each card to its case study. Filter chips to the matching Services anchor |
| Case study | Every service in "At a glance" links to its Services anchor. Related block: two case studies plus one service or article |
| Article | Related block: one case study, one service, one article |
| About | Services, How we work, AI data and IP |
| AI, data and IP | How we work, Services, About |

### 8.2 Rules

- **Descriptive link text always.** "Read the PolicyFly design system case study", never "read more" or "click here". Link text is read by search engines and by screen readers as a list, out of context.
- **Two to four related items.** Never one, never five.
- **Mix the types.** A service linking to a case study and an article is stronger than three services.
- **Every case study links to at least two others.** No dead ends in the gallery.
- **Service names in case study "At a glance" are links.** This builds the service-to-evidence connection automatically as case studies are added.
- **No orphan pages.** Every page is linked from at least two other pages, not counting the header and footer.
- **One outbound path per section.** A section that ends without somewhere to go is where people leave.

### 8.3 Anchors

Every service on `/services` needs a stable `id` matching its slug: `#user-research`, `#product-strategy`, `#design-systems`, and so on. These are link targets from case studies and articles, so they must not change once published.

---

## Part 9: Interface changes to the existing site

The current site cannot hold this content without these changes.

### 9.1 Must fix

| # | Change |
|---|---|
| 1 | Replace `hello@antiphono.studio` with `ben@antiphono.com` everywhere |
| 2 | Fix the LinkedIn link. Remove the Instagram link unless an account exists |
| 3 | Remove all invented statistics from the home page: "52 Products shipped", "9 Years operating", "120+ Research studies", "14 Specialists". Replace with the counter block in 6.4 |
| 4 | Remove the "specialised team" section describing two unfilled roles |
| 5 | Replace all placeholder home page copy with Part 5.1 |
| 6 | Resolve the two competing processes. The four stage process in Part 5.1 is correct. Remove the three stage Research, Design, Validate version |
| 7 | Fix American spellings, "behavior" and any others |
| 8 | Remove every em dash across the whole site |
| 9 | Move case study URLs off the query string, with 301 redirects |
| 10 | Replace `#book` anchors with `/contact` |

### 9.2 New navigation

Header becomes: Work · Services · How we work · Thinking · About · **Get in touch**

Research reports move to the footer. `/ai-enabled-design` leaves the top navigation and becomes a link from `/how-we-work`.

Mobile navigation needs `aria-expanded`, a focus trap while open, Escape to close, and focus returning to the toggle on close.

### 9.3 New components to build

1. **Related content block** (4.3). Highest priority. Used on every page.
2. **Section navigation** (4.2). Pattern already exists on `/ai-enabled-design`. Extract it into a reusable component.
3. **Breadcrumbs** (4.4).
4. **Counter block** (6.4).
5. **Case study gallery with filters** (5.5).
6. **Case study chapter layouts**, three variants (6.3).
7. **Before and after slider** (6.3). Keyboard operable.
8. **FAQ disclosure**, used on Services and AI data and IP. Native `<details>` and `<summary>` unless there is a reason not to.

### 9.4 Styling

**There is no approved visual identity yet.** Do not invent a colour system or select brand typefaces.

Work within whatever is already in `styles.css`. Where a new component needs styling, use the existing tokens. If a value does not exist, add it as a CSS custom property at the top of the file with a comment marking it as provisional, so it can be swapped in one place when the identity lands.

Do not use the retired navy, teal and slate palette.

---

## Part 10: Accessibility

WCAG 2.1 AA. Not optional, and not a later pass. It is also a stated client commitment, so the site failing it is a credibility problem as much as a compliance one.

- Skip link to main content, first focusable element on every page.
- One `h1` per page, no skipped heading levels.
- Colour contrast: 4.5:1 body text, 3:1 large text and interface components.
- Visible focus states on everything focusable. Never remove outlines without replacing them.
- All interactive elements reachable and operable by keyboard, including the slider, the gallery filters and the mobile navigation.
- Meaningful `alt` text on content images. `alt=""` on decorative ones.
- `title` on every iframe, plus a text link to open the embedded prototype directly.
- Form fields, if any, have real associated `<label>` elements.
- `prefers-reduced-motion` respected by counters, smooth scrolling, sticky chapters and any transition.
- Landmarks: `header`, `nav`, `main`, `footer`, with `aria-label` where there is more than one `nav`.
- Filter and navigation state changes announced to screen readers via a polite live region.
- Test with the keyboard alone before considering any component finished.

---

## Part 11: Before launch

- [ ] Remove `noindex, nofollow` from every page. **Only on Ben's instruction.**
- [ ] Update `robots.txt` to allow crawling and reference the sitemap.
- [ ] Replace the invented counter values and set `"placeholder": false`.
- [ ] Confirm the publication conditions in `Antiphono-AI-and-Data-Position-v2.md` section 4 are met before `/ai-data-and-ip` goes live.
- [ ] Every `TODO` in this build resolved or the section removed.
- [ ] No em dashes anywhere. Search the whole codebase.
- [ ] No American spellings.
- [ ] Every image has alt text.
- [ ] Every page has a canonical URL, a description and an `og:image`.
- [ ] All structured data validates.
- [ ] Every internal link resolves. No links to `#`.
- [ ] Keyboard test on every page.
- [ ] `sitemap.xml` covers every indexable page.
- [ ] `/ai-enabled-design` redirects correctly and does not 404 for clients holding the link.

---

## Part 12: Do not

- Do not add a framework, bundler or npm dependency.
- Do not render body content with JavaScript.
- Do not invent statistics, client quotes, outcomes or case study figures.
- Do not use stock photography or generate decorative imagery to fill space.
- Do not describe the two unfilled contract roles as if they exist.
- Do not imply AI runs research or makes decisions.
- Do not imply Antiphono deploys to client production environments.
- Do not name GroupTogether or Future Women outside a case study.
- Do not use em dashes.
- Do not apply a colour palette or brand typeface.
- Do not write more than five chapters in a case study.
- Do not remove `noindex` without Ben's explicit instruction.

---

## Internal note

**Assumptions.** That `render.js` and `data.js` accept additional exports without disturbing existing behaviour. That `server.js` can handle path based routing and redirects. That the deployed variant demos and component library stay online, since the case study template treats them as embeddable. That existing case study assets are usable at the sizes the template needs.

**Risks.** The Services page promises research, design, front end build, design system engineering, instrumentation, testing and enablement, delivered by one person until the contract hires land. Everything listed is real and has been done, but not all of it at once. Manage it in the sales conversation.

The site still has no measured proof points, so every outcome claim is qualitative. This is the weakest thing about the content and it does not fix itself. Instrumenting the current live engagements has a three month lead time before anything is publishable.

The invented counter values are the highest risk item in this document. The amber label is a safeguard, not a guarantee.

**What I would change with more information.** With the visual identity settled, Part 9.4 becomes a real design specification instead of a holding instruction. With one instrumented client, the outcome sections across Services, How we work and the case studies become specific, and the whole site gets materially stronger.

**Outstanding decisions.** Ben to confirm the "what we do not do" list beyond brand identity. Ben to confirm two to three weeks is a realistic discovery. Ben to supply his own background copy for the About page. Ben to supply headlines and summaries for the four case studies.

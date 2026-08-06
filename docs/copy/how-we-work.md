# How we work, `/how-we-work`

**Approved copy. Use as written.**

**Title:** `How We Work | Design, Build, Test, Record | Antiphono`
**Meta description:** `One process from a problem statement to a measured result. Design, working prototypes, testing with real users, and a project record that compounds.`
**Primary terms:** product design process, design to development process
**Schema:** `WebPage`, `BreadcrumbList`

Section navigation required. Anchors: `#design-system`, `#design`, `#build`, `#testing`, `#record`, `#ai-and-people`, `#what-protects-it`.

---

## H1: How we work

One process, from the problem to the live result.

Most organisations run a design process and a development process that meet awkwardly somewhere in the middle. The gap between them is where quality leaks and where budgets go. We run one continuous process instead, with a design system governing everything underneath it and each stage writing down what it learned.

---

## H2: The design system underneath `#design-system`

Authored once in design, synced to code, checked automatically, versioned in its own repository, and loaded by every project that follows.

It is a maintained component library in your codebase, not a design file. Every project starts with it already in place, which is why consistency does not need a person policing it, and why a new team member produces on-brand work in their first week.

[View a live component library]

---

## H2: Design `#design`

A problem to solve, not a solution to build.

We start with a problem statement, then research it. Interviews, usability sessions, and whatever behavioural data already exists. People run the sessions. AI compresses the synthesis and the write up, which is why we can afford to run more of them.

Then prototype directions, built from live design system components rather than drawn. Usually several in parallel, because comparing options is now cheap enough to be normal.

One sign off gate before engineering effort is committed.

---

## H2: Build `#build`

Working front end code, built from the design system, with measurement wired in as it is written rather than added afterwards.

We build on a branch, following your repository conventions. Your team reviews and merges. Your pipeline deploys. We do not deploy to your production environment and we do not own your release process.

What you get is working software rather than pictures of it, ready for your developers to take forward however suits them.

---

## H2: Testing `#testing`

Four stages, and none of them is an upsell.

1. **Internal walkthrough.** The team clicks through directions before anything is built.
2. **Internal review.** The built feature on a real URL, with same day fixes.
3. **QA and user testing.** Regression, accessibility and participant tasks at staging.
4. **Live behaviour.** Variants running against real traffic, measured through your analytics and behaviour platforms.

Because producing a variant is now cheap, testing stops being the thing that gets cut when the timeline tightens. Decisions come from what people did rather than from who argued hardest.

---

## H2: The project record `#record`

Every stage writes its record as the work happens, stored in your repository alongside the code it describes.

Problem statements and the options considered. Why a direction was chosen and what was rejected. What shipped, when, and what the behaviour showed. It is written while the reasoning is still intact, not reconstructed at the end by whoever has time.

Every future session loads it on start up. A question asked in year two gets answered from the record of year one, in minutes, by whoever is working that day. Month twelve costs less and delivers more than month one, and the reason is sitting in your repository rather than in somebody's head.

---

## H2: Where AI does the work, and where people do `#ai-and-people`

We think you should know exactly where AI sits in this, so here is the plain version.

### H3: AI does
Synthesising research material. Producing design and code. Generating options and variants. Writing documentation and change summaries. Analysing test and behavioural data. Keeping the project record current.

### H3: People do
Deciding what problem is worth solving. Talking to your users. Judging which direction is right. Being accountable for what ships.

Everything that reaches you has been reviewed by a person who is answerable for it.

---

## H2: What protects the work `#what-protects-it`

Speed is only worth having if the output holds up.

A review gate before engineering effort is committed. A separate, deliberate gate before anything goes live. A governed design system, so consistency is inherited rather than enforced. WCAG 2.1 AA checked as we go. And a named person signing off on everything that reaches you.

---

**CTA:** [Get in touch]

**Related block:** How we run a project · Services · AI, data and your IP

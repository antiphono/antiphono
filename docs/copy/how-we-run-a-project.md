# How we run a project, `/how-we-run-a-project`

**Approved copy. Use as written.**

This replaces the deep content currently on `/ai-enabled-design`. Every fix listed in the spec has already been applied here, so build from this file rather than migrating the old copy and correcting it.

**Title:** `How We Run a Project | Repositories, Pipelines, Records | Antiphono`
**Meta description:** `The technical detail behind our process. Repository conventions, environments, deployment, measurement, and how the project record is structured.`
**Primary terms:** design and development workflow, repository conventions, deployment pipeline
**Schema:** `WebPage`, `BreadcrumbList`

**Audience:** the CTO or lead engineer doing due diligence, not the buyer. Assume technical literacy. Assume they are looking for reasons this will make a mess in their repository.

Section navigation required. Anchors: `#design-system`, `#design`, `#build`, `#environments`, `#structure`, `#testing`, `#measurement`, `#record`.

`/ai-enabled-design` 301s here once this page is live. Do not delete the old URL, it is shared directly with clients.

---

## H1: How we run a project

The detail behind the process, for the people who will have to live with it.

Everything below adapts to what you already run. Branch names, review rules and deployment follow whatever your organisation already audits. We work inside your conventions rather than importing ours.

---

## H2: The design system `#design-system`

Freestanding, in its own repository, versioned independently. Every project inherits a version of it.

**Authored in design.** Components, tokens, type and brand language, in one place. This is the only file edited by hand.

**Synced and checked.** Design changes are converted into code, then validated for naming, property contracts, breaking changes and accessibility before anything lands.

**A live component library.** Maintained and versioned in your codebase, with a changelog every team can read. Nothing lands unannounced.

**Loaded at the start of every session.** Every project starts with the design system already in place, so work is consistent by default rather than corrected afterwards. Design, product and development all build from the same components, so anyone can experiment against the same source.

[View a live component library] [View the design system in Figma]

---

## H2: Design `#design`

**D1. Brief or problem statement.** A problem to solve, not a solution to build. Owned by the product owner.

**D2. Research.** Interviews, usability sessions and existing behavioural data. Owned by the UX lead, who runs the sessions and decides what the findings mean. AI compresses the synthesis and the write up, which is what makes it affordable to run more sessions rather than fewer.

**D3. Prototype directions.** Four routes, depending on what is being made.

- **Coded prototype.** User facing product work, usually several directions in parallel. Bound to the live design system, with measurement events implemented in the prototype itself.
- **Design tooling for marketing pages and campaigns.** Anything that ships inside the product re-enters the process at build.
- **Templated assets.** Social, email and simple collateral produced at volume, from brand locked templates marketing can self serve.
- **Direct in Figma.** Complex or one off visual design, and new design system components. New patterns are synced into code for everyone.

**D4. Present and iterate.** The team walks the work itself. Review becomes a working session rather than a hand back.

**D5. Sign off.** One decision gate before engineering effort is committed. Only work shipping inside the product carries on. Marketing routes finish here.

---

## H2: Build `#build`

**Local, on each team member's machine**

1. **Open the project folder.** A project instructions file supplies environment URLs, naming and coding conventions.
2. **Branch.** A new sub folder for new work, or a branch for a variation.
3. **Build and instrument.** Built from live design system components, with tracking wired in as it is written.

**In the shared repository**

4. **Pull request.** The change summary is drafted automatically. A second pair of eyes approves it.
5. **Merge to the integration branch.** Deploys itself to a shareable sandbox.
6. **Promote to staging.** A release candidate, checked in production-like conditions.
7. **Merge to main.** A separate, deliberate gate, and the only route to live.

**Your team owns steps 4 to 7.** We build and we raise the pull request. Review, merge, promotion and release are yours, running through your pipeline under your approval rules. We do not deploy to your production environment and we do not own your release process.

What stays fixed regardless of the client: review before development, a separate gate before live, and versions never overwritten.

---

## H2: Environments `#environments`

| Environment | When | Who sees it |
|---|---|---|
| Local preview | Automatic | Only the person building |
| Sandbox URL | On merge to the integration branch | Shareable link for internal review |
| Staging or UAT | On promotion | Production-like, per region where you operate |
| Production | On release | Region deploys, parallel versions, switching controlled by your team |

Findings return to the same local session, so fixes are made where the context still exists rather than reopened later.

**Repositories.** GitHub, Azure DevOps, GitLab, Bitbucket. Branch names and approval rules follow whatever your organisation already audits.

**Deployment.** GitHub Actions, Azure Pipelines, Vercel, Netlify. Staging is optional for small changes and essential for structural ones.

**Switching.** An admin portal, CMS configuration or feature flags decides which version is served.

---

## H2: Structure `#structure`

A convention kept to every time, so a new feature is filed the same way whoever starts it, and the repository stays navigable for people who do not read code.

**One product**

```
<product>/
  <project instructions>   environment, conventions, guardrails
  knowledge/               decisions, research, tests
  features/
    <feature-name>/        v1, v2, never overwritten
  shared/                  used by more than one feature
```

**At company scale**

The same pattern repeats. Every project draws on three shared foundations: the design system, the knowledge base, and captured measurement data. A separate global folder holds infrastructure, deployment and coding guidelines shared across brands.

The point of the convention is not tidiness. It is that anyone, including someone who joined last week, can find why a decision was made without asking the person who made it.

---

## H2: Testing `#testing`

Three internal gates, then real audiences.

**1. Internal walkthrough, local.** In: signed off prototype directions. Out: one surviving direction, with the reasons the others were rejected recorded.

**2. Internal review, sandbox.** In: a built feature on a real URL. Out: a verified build, ready to promote.

**3. QA and acceptance, staging.** Regression, accessibility and participant tasks. In: a sandbox approved build. Out: a formally accepted release, authorised for main.

**4. Live, with real users.** Several variations of the same feature run at once, each shown to a slice of real traffic, each carrying its own analytics. Out: a verdict, and the evidence stored with it.

Because production is fast and deployment is simple, running several variations at once costs little. The decision comes from real behaviour, and the winning version becomes the default.

[View three live test variants]

---

## H2: Measurement `#measurement`

Tracking is implemented and verified at the prototype stage and carried through the build, so every version is measurable from its first session. Nothing is retro-fitted once the question has already been asked.

**What captures the data.** Tag management, analytics, behaviour and session replay platforms, and feature flags. Typically Google Tag Manager, GA4, Contentsquare and whatever else you already run.

**What happens to it.** Results are read as they come in, written to the project record, and loaded by the next session. The comparison is a measurement rather than an opinion.

**What happens to a live result.**

- **It worked.** Becomes the default, and the pattern is promoted into the design system.
- **It did not.** The switch repoints to the previous version. No deploy, no incident.
- **It is close.** A refinement ships alongside and the comparison continues.
- **Either way.** The result is appended to the decision that predicted it.

---

## H2: The project record `#record`

Every stage writes its own record as the work happens, committed in the same pull request as the change it describes.

**From design.** Problem statements, options considered and why, sign off rationale.
**From build.** Change summaries, design system releases and changelogs, what shipped where and when.
**From testing.** Review notes, QA results, live behavioural data.

**Stored** as plain text in the project repository, versioned alongside the feature it describes, organised into decisions, research, tests and conventions.

**Reused** at the start of every session, loaded alongside the design system, and searched when a question comes up.

Each cycle adds to it, so the next one starts further forward. The evidence base grows. Patterns proven in live testing become components everyone inherits. Rules learned the hard way are written once and applied automatically. And nobody owns documentation as a task, because the record is a by-product of doing the work rather than something added at the end.

---

## H2: What this changes

**Time.** Days to a testable build, with no rebuild between approval and a real URL.
**Cost.** A variation is a prompt and a branch, so options stop being expensive.
**Evidence.** Every release can answer whether it worked.
**Control.** Moving quickly no longer costs control, because the gates are still there and a person still signs off.

---

**CTA:** [Get in touch]

**Related block:** How we work · Services · AI, data and your IP

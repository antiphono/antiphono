# Setup, and what to do first

Drop these files into the root of the Antiphono site repository, preserving the folder structure. Then delete this file.

```
CLAUDE.md
.claude/rules/*.md
.claude/skills/add-case-study/SKILL.md
docs/site-build-spec.md
docs/copy/*.md
knowledge/INDEX.md
knowledge/decisions/*.md
```

## Verify it loaded

Start Claude Code from the repository root, then run `/context` and check the list under **Memory files**. `CLAUDE.md` and the unscoped rules should appear. A file that did not load is invisible rather than obviously broken, so check before starting work.

`/memory` lists and opens the memory files if you want to edit them.

## How the layers work

- **`CLAUDE.md`** loads on every session. Kept short deliberately: long files consume context and reduce adherence. It holds only the rules that apply to every edit.
- **`.claude/rules/*.md`** are scoped with `paths` frontmatter, so each loads only when Claude is working on matching files. The SEO rule loads when touching HTML, the case study rule when touching `work/`, and so on.
- **`docs/`** is not loaded automatically. `CLAUDE.md` names the paths, and Claude reads them when the task calls for it. The full spec is too long to sit in context every session.
- **`.claude/skills/add-case-study/`** loads only when invoked or when the task clearly matches.
- **`knowledge/`** is the project record. Claude writes decisions here as they are made.

## Working method

Build in phases. Do not hand over the whole spec and ask for the site.

1. Fix the existing site so it can hold the new content. Spec Part 9.
2. Build the shared components once. Spec Part 4.
3. Build the pages, copy from `docs/copy/`. Spec Part 5.
4. Case study template and the four launch case studies. Spec Part 6.
5. Pre-launch checklist. Spec Part 11.

Use plan mode for anything structural: URL changes, navigation changes, new shared components.

## Worth adding later

CLAUDE.md shapes behaviour but does not enforce it. For anything that must happen every time, a hook is the mechanism that actually guarantees it. A pre-commit hook that fails on an em dash or an American spelling would do more than any written instruction.

Auto memory is on by default, so corrections made during the build start sticking without you writing them down.

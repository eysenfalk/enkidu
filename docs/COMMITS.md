# Commits

This repo treats git history as a first-class artifact.

Core rule: prefer **atomic commits**.

## 1) Atomic commits

An atomic commit is **one logical change** that can be reviewed and reverted independently.

Guidelines:
- One purpose per commit (feature, fix, refactor, docs change, etc.).
- Do not mix whitespace/formatting-only changes with functional changes.
- Use patch staging (`git add -p`) to split mixed edits into separate commits.
- Prefer commits that are bisectable (each commit ideally builds/tests).

Rationale:
- Smaller commits are easier to review and safer to revert.
- Cleaner history reduces debugging time and supports `git bisect` workflows.

References:
- Microsoft engineering playbook: commit best practices and `git add -p`.
  - https://microsoft.github.io/code-with-engineering-playbook/source-control/git-guidance/

## 2) Commit message standard

### Subject line

- Imperative mood ("add", "fix", "refactor").
- Aim for <= 50 characters.
- No trailing period.

### Body (optional)

- Wrap at ~72 characters.
- Explain *why* and *impact*, not a code diff recap.

Reference:
- https://chris.beams.io/git-commit

### Footers / trailers (optional)

Use standard trailers when needed (must be at end, separated by a blank line):
- `Co-authored-by: Name <email>`
- `Signed-off-by: Name <email>`

Reference:
- https://git-scm.com/docs/git-interpret-trailers

## 3) Conventional Commits (optional)

If you want machine-readable commit types, use Conventional Commits:

Examples:
- `feat(scraper): add pagination support`
- `fix(api): handle empty response`
- `docs(workflow): add work packet queue model`

Breaking changes:
- `feat(parser)!: change tokenization rules`
- plus a `BREAKING CHANGE:` footer line.

Reference:
- https://www.conventionalcommits.org/en/v1.0.0-beta.4

## 4) History cleanup (branch-local)

During development (before pushing/PR), it can be useful to keep history clean:
- Use `git commit --fixup <sha>` and later `git rebase -i --autosquash <base>`.

Reference:
- https://git-scm.com/docs/git-rebase

# Evals and scorecards

This folder holds artifacts that make “self-improving” real.

## Scorecards

A scorecard is emitted per PR / per gate run.

- Schema: `scorecard.schema.json`
- Storage: `scorecards/*.json`

## Why JSON?

It’s easy to:
- store
- diff
- aggregate
- feed into dashboards
- use in gates (“block merges if regression”)

## Next steps

1. Implement a CI job that writes a scorecard file.
2. Store it as a CI artifact.
3. Optionally commit it for long-term history.

# Determinism

- Treat timeline time as an explicit input to visual state evaluation.
- Seeking to a time must not require the previous playback history.
- Avoid unseeded randomness in reproducible visual state.
- When a task changes timeline or animation behavior, verify the same requested time twice and compare the resulting state.
- Keep hidden mutable animation state to a minimum and document any required stateful behavior.

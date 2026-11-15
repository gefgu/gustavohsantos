---
title: "fastmob"
description: "Fastkit-Mobility: Rust-accelerated, DataFrame-agnostic mobility analysis for Python."
date: 2026-05-01
demoURL: "https://gefgu.github.io/fastmob/"
repoURL: "https://github.com/gefgu/fastmob"
---

`fastmob` (Fastkit-Mobility) helps researchers turn location data into insight about how people move. A Rust engine handles the compute-intensive work while you keep using pandas or Polars, through Narwhals.

```bash
pip install fastmob
```

```python
from fastmob import radius_of_gyration

radius_of_gyration(df)  # km, per user
```

## What you can do

- Clean GPS traces and separate movement from stops.
- Find staypoints and group repeat visits into locations.
- Measure individual ranges, travel patterns and population flows.
- Route and map-match traces onto road and rail networks.
- Generate synthetic trajectories and compare models with observations.

Many measure names and signatures follow scikit-mobility. It was benchmarked against scikit-mobility on about 4 million Brightkite check-ins; see the [benchmarks](https://gefgu.github.io/fastmob/features/benchmarks/).

[Docs](https://gefgu.github.io/fastmob/) · [PyPI](https://pypi.org/project/fastmob/) · [NetMob 2026 paper](https://inria.hal.science/hal-05755990)

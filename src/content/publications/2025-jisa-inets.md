---
title: "Modeling Interest Networks in Urban Areas: A Comparative Study of Google Places and Foursquare Across Countries"
authors: "Gustavo H. Santos, Fernanda R. Gubert, Myriam Delgado, Thiago H. Silva"
venue: "Journal of Internet Services and Applications (JISA)"
date: 2025-03-01
featureImage: "/images/publications/jisa2025_inets.png"
pdfUrl: "/papers/jisa2025_inets.pdf"
externalUrl: "https://jisa.springeropen.com/journal-link"
# blogPostSlug: "jisa-inets-comparative-study"
---

## Abstract

Location-Based Social Networks (LBSNs) are valuable for understanding urban behavior. [cite_start]Modeling their data as graphs, such as Interest Networks (iNETs), offers important insights for urban area recommendations, mobility predictions, and public policy development[cite: 292]. [cite_start]This study compares iNETs derived from Foursquare and Google Places, using check-ins and reviews[cite: 293]. [cite_start]Although the platforms differ in nature, the resulting iNETs reveal similar urban behavior patterns[cite: 294]. [cite_start]When analyzing the impact of socioeconomic, political, and geographic factors, only geographic factors showed significant influence[cite: 295]. [cite_start]The study also highlights trade-offs in choosing the granularity of area sizes for modeling iNETs and proposes a methodology for identifying zones of high user interest[cite: 296, 297].

## Key Contributions

- [cite_start]**Novel iNETs Approach**: Proposes Interest Networks (iNETs) as a new way to study urban phenomena by analyzing user activities in LBSNs[cite: 317].
- [cite_start]**Granularity Impact Analysis**: Evaluates how different urban area granularities (from coarse to fine) affect iNET similarity across platforms, showing that larger granularities lead to more similar models[cite: 320, 321].
- [cite_start]**Factor Influence Analysis**: Investigates the influence of socioeconomic, political, and geographic factors on iNETs, finding that geographic distance is the most significant factor, while others like income and political polarization have less impact[cite: 323, 324].
- [cite_start]**Urban Preference Zones (UPZones)**: Defines a methodology to identify geographically adjacent areas with strong user interest, which are consistent across LBSNs even at finer granularities[cite: 325, 326].

## Methodology

[cite_start]The study models user activity from Google Places and Foursquare as weighted, undirected graphs called iNETs, where nodes represent urban areas and edges represent co-visitation by users[cite: 480, 481]. [cite_start]The similarity between iNETs from the two platforms is assessed using Pearson and Spearman correlations for edge weights and Kendall's Tau for node centrality rankings across multiple granularities[cite: 495, 499, 502]. [cite_start]The influence of external factors is measured by correlating edge weights with pairwise distances in geographic, socioeconomic, and political features[cite: 507, 512]. [cite_start]Finally, Urban Preference Zones (UPZones) are identified by applying the Leiden community detection algorithm to iNETs at a fine granularity, grouping geographically adjacent and densely connected cells[cite: 526, 531].

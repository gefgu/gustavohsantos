---
title: "Interest Networks (iNETs) for Cities: Cross-Platform Insights and Urban Behavior Explanations"
authors: "Gustavo H. Santos, Myriam Delgado, Thiago H. Silva"
venue: "ACM KDD 2025 Undergraduate and Masters Consortium"
date: 2025-06-01
featureImage: "/images/publications/kdd2025.png"
pdfUrl: "/papers/kdd2025_inets.pdf"
externalUrl: "https://kdd.org/kdd2025/conference-link"
# blogPostSlug: "inets-for-cities"
---

## Abstract

[cite_start]Location-Based Social Networks (LBSNs) provide a rich foundation for modeling urban behavior through Interest Networks (iNETs), which capture how user interests are distributed throughout urban spaces[cite: 1, 2]. [cite_start]This study compares iNETs across platforms (Google Places and Foursquare) and spatial granularities, showing that coarser levels reveal more consistent cross-platform patterns, while finer granularities expose subtle, platform-specific behaviors[cite: 3]. [cite_start]Our analysis finds that, in general, user interest is primarily shaped by geographic proximity and venue similarity, while socioeconomic and political contexts play a lesser role[cite: 4]. [cite_start]Building on these insights, we develop a multi-level, explainable recommendation system that predicts high-interest urban regions for different user types[cite: 5].

## Key Contributions

- [cite_start]**iNETs for Urban Analysis**: Proposes the use of Interest Networks (iNETs) to model urban dynamics based on user co-visitation patterns from LBSNs[cite: 18, 19].
- [cite_start]**Cross-Platform Validation**: Systematically evaluates iNETs across Google Places and Foursquare at various spatial granularities, showing that coarser levels yield more aligned results[cite: 24, 25].
- [cite_start]**Urban Preference Zones (UPZones)**: Introduces a method to identify behaviorally coherent clusters of user interest that transcend administrative boundaries, providing more stable and interpretable units for analysis[cite: 26, 187].
- [cite_start]**Explainable Recommendation System**: Develops a scalable recommender that predicts high-interest regions for different user profiles (e.g., explorers vs. returners) and provides justifications using XAI techniques[cite: 188].

## Methodology

The research is conducted in three phases. [cite_start]First, we construct Interest Networks (iNETs) from user activity on Google Places and Foursquare, where nodes are spatial regions and edges link co-visited areas[cite: 20, 21]. [cite_start]Second, we validate the iNETs by comparing them across platforms and multiple spatial granularities (from administrative boundaries to hexagonal grids) using correlation metrics[cite: 89, 91, 92]. [cite_start]To reconcile differences, we introduce Urban Preference Zones (UPZones) by clustering densely connected regions[cite: 97, 98]. [cite_start]Finally, we use the validated iNETs to build a LightGBM classifier that predicts high-interest regions for individual users based on geographic, socioeconomic, political, and cultural factors, with SHAP values used for explainability[cite: 120, 121].

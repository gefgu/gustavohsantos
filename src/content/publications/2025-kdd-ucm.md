---
title: "Interest Networks (iNETs) for Cities: Cross-Platform Insights and Urban Behavior Explanations"
authors: "Gustavo H. Santos, Myriam Delgado, Thiago H. Silva"
venue: "ACM KDD 2025 Undergraduate and Masters Consortium"
date: 2025-08-03
featureImage: "/images/publications/kdd2025.png"
pdfUrl: "/papers/kdd2025_inets.pdf"
externalUrl: "https://kdd2025.kdd.org/undergraduate-and-masters-consortium/"
# blogPostSlug: "inets-for-cities"
---

## Abstract

Location-Based Social Networks (LBSNs) like Google Places and Foursquare offer a treasure trove of data for understanding how people move through and interact with cities. We introduce **Interest Networks (iNETs)**, a powerful model that captures how user interests are distributed across urban spaces by analyzing co-visitation patterns. This study performs a comprehensive comparison of iNETs across different platforms and spatial granularities (from large city zones to fine-grained hexagonal grids).

Our findings show that while coarser views reveal consistent patterns across platforms, finer granularities uncover subtle, platform-specific behaviors. We discovered that user interest is primarily driven by **geographic proximity** and **venue similarity**, while socioeconomic and political contexts play a surprisingly smaller role.

Building on these insights, we developed a **multi-level, explainable recommendation system** that predicts high-interest urban regions for different types of users (e.g., "explorers" vs. "returners") and explains its recommendations.

---

## Key Contributions

- **iNETs for Urban Analysis**: We propose and formalize the use of Interest Networks (iNETs) to model and analyze urban dynamics based on user co-visitation patterns from LBSNs.

- **Cross-Platform & Multi-Scale Validation**: We systematically evaluate iNETs constructed from Google Places and Foursquare data across a wide range of spatial granularities. Coarser levels (like city boroughs or large hexagons) produce more aligned results, providing a stable macro-view of urban behavior.

- **Urban Preference Zones (UPZones)**: We introduce a method for identifying behaviorally coherent clusters of user interest that transcend traditional administrative boundaries.

- **Explainable Recommendation System**: Our scalable recommender system predicts high-interest regions for different user profiles and provides transparent justifications using Explainable AI (XAI) techniques.

---

## Methodology: A Three-Phase Approach

### Phase 1: Constructing the Interest Networks (iNETs)

We constructed iNETs from user activity datasets on Google Places (over **666 million reviews**) and Foursquare. In these networks:

- **Nodes** represent spatial regions (e.g., ZIP codes or H3 hexagons).
- **Edges** connect regions with shared users, weighted by co-visitation counts.

Each region is enriched with contextual features:

- **Socioeconomic Data**: Income, employment, education (NHGIS, Brazilian Census).
- **Political Data**: Voting data (U.S. 2020 and Brazil 2014 elections).
- **Cultural Data**: Based on Scenes Theory and venue types.

### Phase 2: Cross-Platform Validation and UPZones

We compared iNETs from different platforms using correlation metrics (Pearson, Spearman, Kendall's Tau) across spatial granularities.

Findings:

- **Coarse Granularity**: More consistent patterns across platforms.
- **Fine Granularity**: Reveals subtle, platform-specific behaviors.

To improve consistency, we introduced **Urban Preference Zones (UPZones)** using the **Leiden algorithm** to detect high-resolution behavioral clusters (H3 level 9).

### Phase 3: Building an Explainable Recommender

We trained a **LightGBM classifier** to predict if a region would be of high interest to a user, based on liked/disliked locations and contextual features.

- **Explainability**: Integrated **SHAP values** to explain predictions (e.g., "proximity to places you liked", "similar venue types").
- This model powers our interactive system **CityHood**.

---

## Tools for Urban Analysis

### h3-cities: For Consistent Spatial Analysis

A web-based tool using Uber’s H3 system to divide cities into consistent hexagonal grids.

**Features:**

- Multi-resolution grids (H6 ~36 km² to H9 ~0.11 km²)
- Visual previews and simple downloads
- Enables consistent urban analysis across cities

### CityHood: An Explainable Travel Recommender

An interactive recommender system that helps users explore cities and neighborhoods based on their interests.

**Features:**

- **Two-Level Recommendations**: City and neighborhood levels
- **Rich Contextual Modeling**: Includes socio-demographics, politics, and culture
- **Built-in Explainability**: LIME explanations + natural language summaries
- **Interactive UI**: Built with React and MapLibre

---

## Key Findings & Results

### 1. The Impact of Spatial Granularity

Our comparisons across the U.S., London, and Curitiba show:

- **Coarse Granularities** (e.g., H6, boroughs): High correlation between platforms
- **Fine Granularities** (e.g., H8, H9): Lower correlation, platform-specific behavior

> Platforms capture similar macro-patterns but diverge at micro-scales due to user base and check-in behavior differences.

---

### 2. What Drives Urban Interest?

We correlated iNET edge weights with contextual features:

- **Most Important Predictors**:

  - **Geographic Distance** (strong negative correlation)
  - **Venue Similarity** (strong positive correlation)

- **Weaker Predictors**:
  - Socioeconomic variables (income, education)
  - Political leaning
  - Population density

> Suggests mobility choices are more shaped by proximity and interests than demographics or politics.

---

### 3. Differentiating User Behavior: Explorers vs. Returners

Our model distinguishes:

- **Explorers**: Influenced by proximity to other high-interest cities
- **Returners**: Influenced by similarity in venue categories

> The recommender adapts to behavioral profiles to offer personalized insights.

---

## Figures (Descriptions)

- **Figure 1**: iNET construction pipeline from Google Places user reviews.
- **Figure 2**: Top 6 UPZones in London from Google data with venue category word clouds.
- **Figure 3**: Correlation drop between platforms at finer granularities.
- **Figure 4**: Feature importance—Geography and Venue Similarity dominate.
- **Figure 5**: Explorer vs. Returner behaviors explained via model outputs.
- **Figure 6**: CityHood screenshots (UI steps: labeling → recommendations → refinement).

---

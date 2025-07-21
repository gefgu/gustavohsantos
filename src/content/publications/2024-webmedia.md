---
title: "Modeling Interest in Urban Areas Using Location-Based Social Networks"
authors: "Gustavo H. Santos, Myriam Delgado, Thiago H. Silva"
venue: "XXX Simpósio Brasileiro de Sistemas Multimídia e Web (WebMedia 2024)"
date: 2024-10-01
featureImage: "/images/publications/webmedia2024.png"
pdfUrl: "/papers/webmedia2024_interesse.pdf"
externalUrl: "https://webmedia.org/2024/conference-link"
# blogPostSlug: "webmedia-modeling-interest"
---

## Abstract

Location-Based Social Networks (LBSNs) can help model users' interests in urban areas. [cite_start]This work focuses on Interest Networks (iNETs), which result from modeling LBSN data into graphs[cite: 1723]. [cite_start]The study provides insights into which areas are frequently visited together by analyzing data from two distinct LBSNs, Foursquare and Google Places[cite: 1724]. [cite_start]Although the studied LBSNs differ in nature, with data varying in regularity and purpose, both modeled iNETs revealed similar urban behavior patterns and were likewise impacted by socioeconomic and geographic factors[cite: 1725].

## Key Contributions

- [cite_start]**iNETs for Urban Modeling**: Proposes a graph-based model, the Interest Network (iNET), to represent user interest dynamics in urban areas based on LBSN data[cite: 1730].
- [cite_start]**Comparative Analysis**: Directly compares iNETs constructed from two different LBSNs (Google Places and Foursquare) for the city of Curitiba, Brazil[cite: 1732].
- [cite_start]**Factor Investigation**: Investigates the influence of external factors, including socioeconomic data, political preferences, and geographic distance, on the modeled user interest patterns[cite: 1740, 1741].
- [cite_start]**Tool Development**: Introduces `h3-cities`, a tool developed to standardize the division of cities into adjustable hexagonal grids, facilitating scalable urban analysis across different regions[cite: 1742].

## Methodology

[cite_start]This research constructs Interest Networks (iNETs) using geolocated data from Google Places (reviews) and Foursquare (check-ins) for Curitiba[cite: 1735]. [cite_start]An iNET is an undirected graph where nodes are city neighborhoods and weighted edges represent the number of users who have interacted with establishments in both areas[cite: 1760, 1761]. [cite_start]The similarity of the iNETs from both platforms is measured using Pearson correlation for edge weights and Kendall's Tau for node importance ranking[cite: 1778, 1779]. [cite_start]To analyze external influences, socioeconomic and political data are collected for each neighborhood and correlated with iNET edge weights to determine their impact, with geographic distance being a key factor considered[cite: 1764, 1768, 1791].

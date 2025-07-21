---
title: "Interest Networks: Comparing Google Places and Foursquare in Capturing User Choice for Urban Areas"
authors: "Gustavo H. Santos, Fernanda R. Gubert, Myriam Delgado, Thiago H. Silva"
venue: "VIII Workshop de Computação Urbana (CoUrb), SBRC 2024"
date: 2024-05-01
featureImage: "/images/publications/courb2024.png"
pdfUrl: "/papers/courb2024_redes_interesse.pdf"
externalUrl: "https://sbrc.org.br/2024/courb-link"
# blogPostSlug: "courb-interest-networks"
---

## Abstract

[cite_start]Location-Based Social Networks (LBSNs) are valuable for understanding urban behavior and user preferences[cite: 1479]. [cite_start]Modeling this data into graphs, such as Interest Networks (iNETs), enables significant insights for applications like urban area recommendations and mobility forecasting[cite: 1480, 1481]. [cite_start]This study uses check-in and review data to compare the iNETs resulting from two distinct LBSNs, Foursquare and Google Places[cite: 1482]. [cite_start]Although the platforms differ in nature, with data varying in regularity and purpose, both modeled iNETs revealed similar urban behavior patterns and were similarly impacted by socioeconomic and geographic factors[cite: 1483].

## Key Contributions

- [cite_start]**Introduction of Interest Networks (iNETs)**: Models user interest in urban areas as a graph where nodes are neighborhoods and edges connect co-visited areas[cite: 1498].
- [cite_start]**Direct LBSN Comparison**: Provides a direct comparison of urban behavior patterns captured by Google Places and Foursquare in the city of Curitiba[cite: 1500].
- [cite_start]**High Network Similarity**: Demonstrates that despite differences in data type and user engagement, the iNETs from both platforms show strong similarity, with a Pearson correlation of 0.875 for edge weights[cite: 1620].
- [cite_start]**Factor Analysis**: Concludes that geographic distance is the most significant factor influencing user interest between areas, while socioeconomic and political factors have a weak correlation[cite: 1657, 1671].

## Methodology

[cite_start]The study constructs Interest Networks (iNETs) from Google Places reviews and Foursquare check-ins in Curitiba[cite: 1601, 1607]. [cite_start]These are non-directed, weighted graphs where nodes are city neighborhoods and edge weights quantify the number of users visiting both connected neighborhoods[cite: 1602]. [cite_start]The similarity between the two iNETs is measured using Pearson correlation on edge weights and Kendall's Tau on eigenvector centrality rankings of the nodes[cite: 1617, 1625]. [cite_start]The influence of socioeconomic (income, race), political (voting data), and geographic factors is evaluated by correlating the differences in these factors between neighborhood pairs with the corresponding edge weights in the iNETs[cite: 1637, 1638].

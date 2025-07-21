---
title: "Urban Cultural Signature with Web Data: A Case Study with Google Places Venues"
authors: "Fernanda R. Gubert, Gustavo H. Santos, Myriam Delgado, Daniel Silver, Thiago H. Silva"
venue: "Journal of Internet Services and Applications (JISA)"
date: 2025-07-01
featureImage: "/images/publications/jisa2025_cultural.png"
pdfUrl: "/papers/jisa2025_cultural_signature.pdf"
externalUrl: "https://jisa.springeropen.com/journal-link"
# blogPostSlug: "jisa-urban-cultural-signature"
---

## Abstract

[cite_start]Much of the existing research on cultural similarities between regions relies on user behavior data, which can limit scalability[cite: 785]. [cite_start]To address this, our work focuses on extracting venue data from Google Places and proposing a methodology based on the Scenes concept to enrich this dataset for generating cultural signatures of urban areas[cite: 786]. [cite_start]Using Curitiba, Brazil, and Chicago, USA, as case studies, the results demonstrate that the proposed method can identify cultural similarities between regions while supporting a standardized area-division strategy for cross-country analysis[cite: 788]. [cite_start]The findings show consistency, as evidenced by the segmentation of Curitiba and Chicago into culturally distinct clusters[cite: 789].

## Key Contributions

- [cite_start]**Cultural Profile Extraction**: Explores an approach for extracting relevant features of urban areas using Google Places venue data to derive their cultural profiles[cite: 816].
- [cite_start]**Scenes-Based Methodology**: Develops a methodology grounded in Scenes Theory to create enriched, 15-dimensional cultural signatures for urban areas[cite: 786, 1265].
- [cite_start]**Granularity Analysis**: Assesses the impact of varying urban area granularity (using a hexagonal grid system) on the generation and quality of cultural signatures[cite: 818, 1146].
- [cite_start]**Cross-City Comparison**: Demonstrates the application of the cultural signatures to identify and compare culturally similar areas within and between different cities (Curitiba and Chicago)[cite: 819, 1244].

## Methodology

[cite_start]The study extracts venue data from the Google Places API, enriching the basic categories with more specific ones from Yelp to increase detail[cite: 1026, 1033]. [cite_start]These venue categories are then mapped to the 15 dimensions of Scenes Theory using a sentence-embedding model (SBERT) to create a cultural signature vector for each venue[cite: 1056, 1077]. [cite_start]The cultural signature of a region (a neighborhood or a hexagon) is calculated by averaging the vectors of all venues within it[cite: 1007]. [cite_start]Hierarchical agglomerative clustering is then used to group regions with similar cultural signatures, and the results are validated qualitatively and through clustering evaluation metrics[cite: 1120, 1170].

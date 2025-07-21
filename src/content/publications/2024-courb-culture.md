---
title: "Creation of a Cultural Signature for Urban Areas with Geolocated Establishments on the Web"
authors: "Fernanda Gubert, Gustavo H. Santos, Myriam Delgado, Daniel Silver, Thiago Silva"
venue: "VIII Workshop de Computação Urbana (CoUrb), SBRC 2024"
date: 2024-05-01
featureImage: "/images/publications/courb2024_cultural.png"
pdfUrl: "/papers/courb2024_assinatura_cultural.pdf"
externalUrl: "https://sbrc.org.br/2024/courb-link"
# blogPostSlug: "courb-cultural-signature"
---

## Abstract

This paper introduces a method for creating cultural signatures of urban areas using geolocated establishment data from the web. By leveraging Google Places data for the city of Curitiba, we apply concepts from Scenes Theory to develop a rich, multi-dimensional profile for city neighborhoods. This work demonstrates how clustering neighborhoods based on these cultural signatures can reveal meaningful patterns and distinctions within the urban landscape. This approach offers a scalable and data-driven way to analyze urban culture without relying on traditional survey methods. [cite_start]This work was awarded 3rd place at the CoUrb 2024 workshop[cite: 1798].

## Key Contributions

- [cite_start]**Application of Scenes Theory**: Applies the 15 dimensions of Scenes Theory to characterize urban neighborhoods in Curitiba based on the types of venues they contain[cite: 1797].
- [cite_start]**Neighborhood Clustering**: Groups neighborhoods with similar "cultural signatures" using hierarchical clustering, identifying distinct cultural zones within the city[cite: 1797].
- [cite_start]**Data-Driven Urban Analysis**: Presents a methodology for cultural analysis that relies on publicly available web data (Google Places), offering a scalable alternative to traditional methods[cite: 1264].
- [cite_start]**Validation in Curitiba**: Provides a detailed case study of Curitiba, showing that the resulting cultural clusters align with known characteristics of the city's neighborhoods, from the commercial center to residential and entertainment-focused areas[cite: 1124, 1128, 1130, 1134].

## Methodology

[cite_start]The methodology begins by collecting comprehensive venue data for Curitiba's neighborhoods from Google Places[cite: 1114, 1116]. [cite_start]Each venue's category is mapped to the 15 dimensions of Scenes Theory to generate a cultural score vector[cite: 1120]. [cite_start]The overall cultural signature for each neighborhood is then calculated by averaging the vectors of all venues within it[cite: 1119]. [cite_start]Finally, these neighborhood signatures are grouped using hierarchical agglomerative clustering with Ward's method to identify clusters of culturally similar areas within the city[cite: 1120, 1122]. [cite_start]The resulting clusters are analyzed based on their dominant Scenes dimensions to interpret their cultural character[cite: 1137].

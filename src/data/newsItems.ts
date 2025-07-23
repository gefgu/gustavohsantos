// Define the type for news items
export interface NewsItem {
  date: Date;
  title: string;
  publication: string;
  url: string;
  description: string;
  image?: string;
}

// Add your news mentions here
const newsItems: NewsItem[] = [
  {
    date: new Date("2024-10-26"),
    title: "Estudante Gustavo Santos é premiado no Webmedia 2024",
    publication: "UTFPR - DAINF",
    url: "https://www.utfpr.edu.br/cursos/coordenacoes/graduacao/curitiba/ct-engenharia-de-computacao/destaques/estudante-gustavo-santos-e-premiado-no-webmedia-2024",
    description:
      'O trabalho "Modelagem do Interesse por Áreas Urbanas Usando Redes Sociais Baseadas em Localização", de autoria de Gustavo H. Santos, Myriam Delgado e Thiago H. Silva, foi premiado com o 1º lugar no Concurso de Trabalhos de Iniciação Científica do 30º Simpósio Brasileiro de Sistemas Multimídia e Web (WebMedia 2024) ocorrido no mês de outubro em Juiz De Fora.',
    image: "/news/noticias_utfpr_1.png",
  },
  {
    date: new Date("2024-10-29"),
    title:
      "Estudante de Engenharia da Computação é premiado em Simpósio nacional",
    publication: "UTFPR",
    url: "https://www.utfpr.edu.br/noticias/curitiba/estudante-de-engenharia-da-computacao-e-premiado-em-simposio-nacional",
    description:
      "Gustavo dos Santos recebeu o prêmio de melhor trabalho de iniciação científica.",
    image: "/news/noticias_utfpr_2.png",
  },
];

export default newsItems;

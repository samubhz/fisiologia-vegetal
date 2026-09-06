/* =========================================================================
   Fisiologia Vegetal — indicações de livros (Amazon Associates)
   -------------------------------------------------------------------------
   EDITE ESTE ARQUIVO para cadastrar livros — ou use a página
   admin-livros.html, que gera este mesmo conteúdo pronto para colar aqui.

   Campos de cada livro:
     id       -> identificador único (kebab-case)
     titulo   -> título do livro
     autores  -> autores (texto livre)
     edicao   -> edição / ano (opcional)
     asin     -> ASIN do produto na Amazon (10 caracteres). Se não tiver,
                 deixe "" e o botão vira uma BUSCA na Amazon (já com seu tag).
     link     -> URL completa (opcional). Se preenchida, tem prioridade sobre o ASIN.
     capa     -> URL da imagem da capa (opcional). Se vazio e houver ASIN,
                 usa a imagem da própria Amazon automaticamente.
     nota     -> por que você recomenda / o que o aluno encontra nele
     paginas  -> onde o livro aparece. Use "geral" para TODAS as páginas,
                 ou os identificadores das páginas:
                 "inicio", "glossario",
                 "01-agua", "02-estomatos", "03-nutricao", "04-floema",
                 "05-fotossintese", "06-respiracao", "07-hormonios",
                 "08-luz", "09-tropismos", "10-estresse"
   ========================================================================= */

window.LIVROS_CONFIG = {
  /* Seu identificador de Associado da Amazon. Ex.: "fisiovegetal-20" */
  amazonTag: "SEU-TAG-20",
  /* Loja da Amazon usada nos links */
  marketplace: "https://www.amazon.com.br",
  /* Texto de divulgação exigido pelo programa de Associados (não remova) */
  disclosure: "Como Associado da Amazon, este site recebe por compras qualificadas — sem custo adicional para você."
};

window.LIVROS = [
  {
    id: "taiz-zeiger",
    titulo: "Fisiologia e Desenvolvimento Vegetal",
    autores: "Lincoln Taiz, Eduardo Zeiger, Ian Max Møller, Angus Murphy",
    edicao: "6ª edição",
    asin: "",
    link: "",
    capa: "",
    nota: "Referência principal de toda a disciplina. Todos os módulos deste site seguem a organização e a profundidade deste livro.",
    paginas: ["geral"]
  },
  {
    id: "kerbauy-fisiologia",
    titulo: "Fisiologia Vegetal",
    autores: "Gilberto Barbante Kerbauy",
    edicao: "3ª edição",
    asin: "",
    link: "",
    capa: "",
    nota: "Texto em português, objetivo, ótimo para revisão antes das provas.",
    paginas: ["geral"]
  },
  {
    id: "buchanan-biochem",
    titulo: "Biochemistry & Molecular Biology of Plants",
    autores: "Bob B. Buchanan, Wilhelm Gruissem, Russell L. Jones",
    edicao: "2ª edição",
    asin: "",
    link: "",
    capa: "",
    nota: "Para quem quer descer ao nível molecular da fotossíntese, respiração e sinalização.",
    paginas: ["05-fotossintese", "06-respiracao", "07-hormonios", "10-estresse"]
  },
  {
    id: "marschner-nutrition",
    titulo: "Marschner's Mineral Nutrition of Higher Plants",
    autores: "Petra Marschner (ed.)",
    edicao: "3ª edição",
    asin: "",
    link: "",
    capa: "",
    nota: "A obra de referência em nutrição mineral: funções, absorção e diagnóstico de deficiências.",
    paginas: ["03-nutricao"]
  }
];

# Fisiologia Vegetal — site didático interativo

Recurso de apoio à disciplina de **Fisiologia Vegetal** (graduação, UnB). Percorre como
as plantas funcionam e como respondem aos estímulos do ambiente, com um **instrumento
interativo** em cada módulo (simuladores em SVG + JavaScript, sem dependências).

Site estático puro: HTML + CSS + JS. Não há etapa de build.

## Estrutura

```
index.html              página inicial (percurso, objetivos, grade de módulos)
glossario.html          glossário filtrável (56 termos)
css/style.css           sistema de design (tema claro/escuro)
js/main.js              tema, tooltips do glossário, motor de quiz
modulos/
  01-agua.html          Água e relações hídricas
  02-estomatos.html     Estômatos e transpiração
  03-nutricao.html      Nutrição mineral
  04-floema.html        Transporte no floema
  05-fotossintese.html  Fotossíntese (C3 / C4 / CAM)
  06-respiracao.html    Respiração e metabolismo
  07-hormonios.html     Hormônios vegetais
  08-luz.html           Luz e fotomorfogênese
  09-tropismos.html     Movimentos e tropismos
  10-estresse.html      Fisiologia do estresse
```

Cada módulo segue a mesma estrutura: ideia central → instrumento → mecanismo
(nível *Taiz & Zeiger*) → blocos "Aprofunde" → quiz de verificação → **livros recomendados**.

```
livros.html             catálogo de indicações, agrupado por módulo
admin-livros.html        ferramenta para cadastrar as indicações (uso interno)
js/livros-data.js        os dados dos livros (edite aqui ou pela ferramenta)
```

## Indicações de livros (monetização — Amazon Associates)

Cada página exibe um bloco **"Livros sobre este tema"** antes da navegação, e há
uma aba **Livros** com o catálogo completo. Um mesmo livro pode aparecer em várias
páginas.

**Para cadastrar / editar:**

1. Coloque seu identificador de Associado em `js/livros-data.js`
   (`amazonTag: "seu-tag-20"`) — ou informe-o na ferramenta.
2. Abra `admin-livros.html` no navegador. Preencha o formulário (título, autores,
   ASIN, nota, e em **quais páginas** o livro aparece) e clique em *Adicionar*.
3. Clique em **Gerar arquivo**, copie o resultado e cole em `js/livros-data.js`.
4. `git add js/livros-data.js && git commit -m "livros" && git push`.

Detalhes dos campos:

| campo     | observação |
|-----------|------------|
| `asin`    | 10 caracteres do produto na Amazon. Vazio → o botão vira uma *busca* na Amazon (já com seu tag). |
| `link`    | URL completa; se preenchida, tem prioridade sobre o `asin`. |
| `capa`    | vazio + `asin` preenchido → usa a imagem da própria Amazon. |
| `paginas` | `"geral"` = todas as páginas; ou identificadores como `"05-fotossintese"`, `"03-nutricao"`, `"inicio"`. |

O aviso de divulgação exigido pelo programa de Associados já aparece automaticamente
em cada bloco e na página Livros. Cadastre-se em <https://associados.amazon.com.br>.

## Ver localmente

Como as páginas carregam CSS/JS por caminho relativo, use um servidor local
(abrir o `index.html` direto do disco também funciona na maioria dos navegadores):

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000/>.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `fisiologia-vegetal`).
2. Na pasta do projeto:

   ```bash
   git init
   git add .
   git commit -m "Site de Fisiologia Vegetal"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/fisiologia-vegetal.git
   git push -u origin main
   ```

3. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, pasta `/ (root)`. Salvar.
4. Em ~1 min o site fica no ar em
   `https://SEU-USUARIO.github.io/fisiologia-vegetal/`.

O arquivo `.nojekyll` já está incluído para o GitHub Pages servir os arquivos como estão.

## Referências de conteúdo

- Taiz, Zeiger, Møller & Murphy. *Fisiologia e Desenvolvimento Vegetal*, 6ª ed.
- Kerbauy. *Fisiologia Vegetal*, 3ª ed.
- Buchanan, Gruissem & Jones. *Biochemistry & Molecular Biology of Plants*, 2ª ed.
- Farquhar, von Caemmerer & Berry (1980); Münch (1930); Skoog & Miller (1957);
  van den Honert (1948).

Os modelos dos instrumentos são **simplificações didáticas** calibradas para
ordens de grandeza realistas, não ferramentas de pesquisa.

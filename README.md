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
(nível *Taiz & Zeiger*) → blocos "Aprofunde" → quiz de verificação.

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

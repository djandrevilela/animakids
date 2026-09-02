# AnimaKids — Plano de Treino

Webapp simples (HTML + CSS + JS puro — sem backend, sem build) para gerir o
plano de treino, objetivos, progresso e presenças da turma AnimaKids.
Mobile-first, instalável como app no telemóvel (Android e iOS), publicada
via GitHub Pages e sincronizada entre dispositivos através do GitHub.

## Como esta versão protege os nomes das atletas

A app é feita para ficar **publicável num repositório público** (para
poderes usar GitHub Pages grátis) sem expor o nome de nenhuma criança:

- O código público (`js/data.js`) só conhece **códigos anónimos**:
  `A01`, `A02`, … `A22`. É esse ficheiro que fica no repositório público
  do GitHub Pages — não tem nomes nenhuns.
- Os **nomes reais** vivem só em dois sítios, nenhum deles público:
  1. Neste browser (`localStorage`), depois de os escreveres uma vez em
     **Mais → Nomes reais das atletas**.
  2. Opcionalmente, num ficheiro `roster.json` dentro de um **segundo
     repositório GitHub, esse sim PRIVADO**, usado só para
     sincronizares os nomes entre os teus próprios dispositivos.
- Quem abrir o link público da app **sem saber os nomes** vê sempre
  "Atleta A01", "Atleta A02", etc. — a app funciona perfeitamente à mesma
  (plano, progresso, presenças), só sem mostrar identidades.
- Tu, depois de preencheres os nomes reais (uma vez, em qualquer dos teus
  dispositivos) e ativares a sincronização apontando para o teu
  repositório privado, vês sempre os nomes reais nesse dispositivo.

Ou seja: **repositório do código = público** (GitHub Pages), **nomes reais
= privados** (só no teu browser + opcionalmente num repositório GitHub
privado à parte). Os dois nunca se misturam.

### O ficheiro `roster.json` que vem com este projeto

Incluí, fora da pasta da app, um ficheiro `roster.json` já preenchido com
o mapeamento código → nome real, para não teres de os escrever todos à
mão. **Este ficheiro NUNCA deve ir para o repositório público.** As duas
formas de o usares:

1. **Recomendado:** cria um segundo repositório GitHub, esse **privado**
   (ex: `animakids-dados`), e faz upload só deste `roster.json` para a
   raiz dele. Depois, em **Mais → Definições de sincronização**, usa o
   nome desse repositório privado (não o do código). A app vai buscar
   `roster.json` a esse repositório sempre que sincronizares.
2. **Mais simples, sem repositório extra:** abre a app, vai a **Mais →
   Nomes reais das atletas**, e copia manualmente os nomes de
   `roster.json` para os campos (ficam guardados só no teu browser,
   nesse dispositivo).

## Acesso à app

A app está protegida por uma password única: **`gmna27`**.

⚠️ Isto **não é segurança a sério** — serve só para impedir o acesso
casual por quem encontrar o link. A password fica apenas ligeiramente
disfarçada (checksum, não encriptação) dentro do código-fonte, visível a
quem abrir o repositório no GitHub. Não reutilizes aqui uma password que
uses noutro sítio importante.

## Como publicar no GitHub Pages

1. Cria um repositório novo (ex: `animakids-app`) — este **pode ser
   público**, já não contém nomes — e faz upload de todos os ficheiros e
   pastas da pasta `animakids-webapp/`: `index.html`,
   `manifest.webmanifest`, `service-worker.js`, `css/`, `js/`, `icons/`,
   `README.md`. **Não incluas o `roster.json`** (esse fica fora, ver
   secção anterior).
2. No repositório: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch**, escolhe o branch `main` e a pasta `/ (root)`.
3. Guarda. Ao fim de 1-2 minutos a app fica disponível em
   `https://<o-teu-user>.github.io/<nome-do-repo>/`.

Não há build nem passos extra: é literalmente "git push" + ativar o Pages.

## Instalar como app no telemóvel

- **Android (Chrome):** abre o link, toca no menu (⋮) → "Adicionar ao ecrã
  principal" / "Instalar app".
- **iOS (Safari):** abre o link, toca no ícone de partilha (□↑) → "Adicionar
  ao ecrã principal".

A app fica com ícone próprio, abre em ecrã inteiro (sem barra de endereço)
e funciona offline para consulta (os dados só se guardam/sincronizam
quando há ligação).

## Como funciona a sincronização entre dispositivos

Há dois ficheiros diferentes a sincronizar, no mesmo repositório privado
(ou em dois, se preferires separar):

- **`animakids-state.json`** — grupos, progresso, presenças, treinos
  marcados como realizados. Guardado por código de atleta (`A01`…), nunca
  por nome.
- **`roster.json`** — o mapeamento código → nome real. Só existe se tu o
  criares (ver secção "O ficheiro roster.json" acima).

**Para ativar a sincronização:** toca na pastilha de estado no topo da
app, ou em **"Mais" → Definições**, e preenche:

- **Repositório** — `o-teu-user/animakids-dados` (o repositório
  **privado**, não o do código)
- **Ramo** — `main`
- **Personal Access Token** — ver abaixo como criar

Repete em cada dispositivo que quiseres ligar aos mesmos dados. A partir
daí, qualquer alteração (progresso, presença, grupo, treino realizado,
nomes) guarda-se logo localmente e é enviada para o GitHub ao fim de
~1,5 segundos; ao abrires a app noutro dispositivo, vai buscar
automaticamente a versão mais recente.

⚠️ **Este aviso é a sério (ao contrário da password de acesso, que é só
simbólica):** o token fica guardado em texto simples neste browser — quem
tiver acesso a esse dispositivo consegue lê-lo. Por isso:

- Usa sempre um token **"fine-grained"**, limitado **só ao repositório
  privado de dados**.
- Dá-lhe apenas a permissão **"Contents: Read and write"**.
- Nunca uses um token "classic" com acesso a todos os teus repositórios.

### Criar o token

1. GitHub → foto de perfil → **Settings** → **Developer settings** →
   **Personal access tokens** → **Fine-grained tokens** → **Generate new
   token**.
2. Nome: `animakids-dados` (ou o que preferires).
3. **Repository access:** "Only select repositories" → escolhe **só** o
   repositório privado de dados.
4. **Permissions → Repository permissions → Contents:** `Read and write`.
   Deixa tudo o resto sem acesso.
5. Gera o token e copia-o (só é mostrado uma vez) — cola-o no ecrã de
   sincronização da app.

Se dois dispositivos alterarem dados ao mesmo tempo sem terem sincronizado
entretanto, ganha a alteração mais recente — não há fusão automática
campo a campo.

## Vistas da app

- **Plano** — plano de treino completo (Set-Dez 2026 / Jan-Mar 2027 /
  Abr-Jul 2027), sessão a sessão: aquecimento, jogo, ginástica (com
  Estações/Filas/Circuito Geral), alongamentos, micro e fase. Mostra um
  banner com a **fase macro atual** e permite ver a descrição de todas as
  fases da época. Cada sessão tem um botão **"Marcar como realizado"** —
  depois de marcada, sai da lista principal e passa para o separador
  **"Histórico"**.
- **Objetivos** — os 14 objetivos da época, por categoria, com os 5 níveis
  de progresso descritos.
- **Progresso** — por atleta ou por objetivo, com barra de 5 níveis e
  botões **−** / **+**.
- **Atletas** — lista das 22 atletas (nome real, se já preenchido; código
  caso contrário) com seletor de grupo (1/2/3).
- **Presenças** — abre sempre no **próximo treino**; os treinos passados
  ficam à esquerda no seletor de datas, com ✅ se já realizados. No menu
  "Mais" há um botão **"Exportar Presenças (Excel)"**, que gera um
  `.xlsx` no formato de calendário mensal, com os nomes reais se já os
  tiveres preenchido.

## Estrutura dos ficheiros

```
index.html              → estrutura da página (login, vistas, modal de definições)
css/style.css           → design (mobile-first, Bootstrap 5 + estilo próprio)
js/data.js              → objetivos, plano de treino, fases macro e CÓDIGOS de atleta (sem nomes — seguro para repo público)
js/app.js               → lógica: login, estado, roster privado, sincronização GitHub, exportação Excel, vistas
manifest.webmanifest    → configuração PWA (nome, ícones, cores)
service-worker.js       → cache offline + instalabilidade
icons/                  → ícones da app (192, 512, 180px)
```

Fora desta pasta, entrego também (para NÃO ires para o repositório
público):

```
roster.json              → mapeamento código → nome real, para o teu repositório PRIVADO
animakids-state.json     → criado automaticamente no repositório privado após a 1ª sincronização
```

## Alterar os dados do plano de treino

O plano de treino, os objetivos e as fases macro vêm do ficheiro
`js/data.js`, gerado a partir do Excel AnimaKids 26/27. Para alterar
qualquer um destes (novo objetivo, sessão, etc.) ou para adicionar/remover
atletas (o que muda os códigos `A01`…), pede a quem gerou este projeto
para regenerar os ficheiros.

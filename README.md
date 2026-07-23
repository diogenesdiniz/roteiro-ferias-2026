# Roteiro de viagem 2026 — Londres, Paris e Madrid

Painel interativo de viagem, cobrindo Londres (19–25/08), Paris (6 dias em seguida) e Madrid (1 dia ao final). Site estático, publicado no GitHub Pages, pensado para consulta na rua pelo celular ou iPad durante a viagem.

Este é o repositório do **app**: código, dados do roteiro, e o conteúdo em prosa de cada cidade. O planejamento de desenvolvimento (requisitos, ADRs, tasks, o agente de planejamento) vive num repositório separado, ligado aqui como submódulo em `planejamento/`. Ver `SETUP.md`, na raiz do pacote de início de projeto, para os comandos de ligar os dois.

## Estrutura

```
.
├── data/
│   ├── roteiro.json     (dias, paradas, trechos, variantes, reservas, por cidade — o que o app consome)
│   └── lugares.json     (lugares candidatos por cidade, com origem e status)
├── plano/
│   ├── plano-londres.md (roteiro em prosa, fechado)
│   ├── plano-paris.md   (esqueleto, sem lugares ainda)
│   └── plano-madrid.md  (esqueleto, sem lugares ainda)
├── legacy/
│   ├── roteiro-londres.jsx              (o protótipo original, referência)
│   └── roteiro-londres-19-25-agosto.md  (a primeira versão do plano de Londres)
├── .github/workflows/deploy.yml
├── .claude/settings.json  (expõe planejamento/ como diretório adicional do Claude Code)
└── planejamento/           (submódulo git, ver abaixo)
```

`src/` (o app React de verdade) ainda não existe neste pacote — a migração do protótipo em `legacy/roteiro-londres.jsx` para uma estrutura de componentes com Google Maps real está descrita em `planejamento/tasks/google-maps-fotos/`.

## O submódulo de planejamento

```bash
git submodule update --init
```

Sem esse comando depois do clone, a pasta `planejamento/` fica vazia. Ela não é necessária para rodar ou buildar o app — só para consultar requisitos, ADRs e tasks, ou para o Claude Code usar o agente `planejador-viagem`.

## Rodando localmente

```bash
npm install
npm run dev
```

Precisa de uma chave do Google Maps em `.env.local` (nunca commitada):

```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

## Deploy

Cada push na branch `main` builda e publica via GitHub Actions. A chave de produção fica em **Settings → Secrets and variables → Actions**, como `VITE_GOOGLE_MAPS_API_KEY`. O checkout do workflow não inicializa submódulos, então o conteúdo de `planejamento/` nunca entra no build.

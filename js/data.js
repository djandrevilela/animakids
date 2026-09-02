const ANIMAKIDS_DATA = {
  "athletes": [
    "A01",
    "A02",
    "A03",
    "A04",
    "A05",
    "A06",
    "A07",
    "A08",
    "A09",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
    "A16",
    "A17",
    "A18",
    "A19",
    "A20",
    "A21",
    "A22"
  ],
  "objectives": [
    {
      "id": "mini-trampolim-1",
      "categoria": "Mini-Trampolim",
      "nome": "Grupo 1 - Saltos Base (Extensão, Engrupado, Carpa Afastada, Carpa Junta, Meia Pirueta, Pirueta)",
      "niveis": [
        "Extensão e Engrupado bem executados",
        "Carpa Afastada e Carpa Junta corretas",
        "Meia Pirueta controlada",
        "Pirueta completa controlada",
        "Objetivo alcançado - todos os saltos base bem executados em sequência"
      ]
    },
    {
      "id": "mini-trampolim-2",
      "categoria": "Mini-Trampolim",
      "nome": "Grupo 2 - Mortal à Frente",
      "niveis": [
        "Cambalhota bem executada (colchão / plano inclinado)",
        "Mortal à Frente com assistência direta do treinador",
        "Mortal à Frente com apoio de cinto / mini-assistência",
        "Mortal à Frente sozinha, com treinador próximo",
        "Objetivo alcançado - Mortal à Frente sozinha e controlada"
      ]
    },
    {
      "id": "mini-trampolim-3",
      "categoria": "Mini-Trampolim",
      "nome": "Grupo 3 - 3/4 Mortal",
      "niveis": [
        "Mortal à Frente consolidado e controlado",
        "3/4 Mortal com assistência (queda controlada)",
        "3/4 Mortal com mini-assistência",
        "3/4 Mortal sozinha, receção ainda imperfeita",
        "Objetivo alcançado - 3/4 Mortal sozinha e controlada"
      ]
    },
    {
      "id": "plinto-reuter-1",
      "categoria": "Plinto (Reuter)",
      "nome": "Grupo 1 - Salto Cambalhota",
      "niveis": [
        "Coelho no plinto baixo",
        "Entrada em cambalhota no plinto com assistência",
        "Salto Cambalhota com assistência ligeira",
        "Salto Cambalhota sozinha, receção instável",
        "Objetivo alcançado - Salto Cambalhota sozinha e controlada"
      ]
    },
    {
      "id": "plinto-reuter-2",
      "categoria": "Plinto (Reuter)",
      "nome": "Grupo 2 - Salto ao Eixo",
      "niveis": [
        "Coelho Eixo / afastar pernas no plinto baixo",
        "Salto ao Eixo com assistência",
        "Salto ao Eixo com mini-assistência",
        "Salto ao Eixo sozinha, receção instável",
        "Objetivo alcançado - Salto ao Eixo sozinha e controlada"
      ]
    },
    {
      "id": "plinto-reuter-3",
      "categoria": "Plinto (Reuter)",
      "nome": "Grupo 3 - Salto de Apoio Facial",
      "niveis": [
        "Apoio facial no plinto baixo com salto para pé",
        "Salto de Apoio Facial com assistência",
        "Salto de Apoio Facial com mini-assistência",
        "Salto de Apoio Facial sozinha, receção instável",
        "Objetivo alcançado - Salto de Apoio Facial sozinha e controlada"
      ]
    },
    {
      "id": "solo-1",
      "categoria": "Solo",
      "nome": "Grupo 1 - Série Nível 3 (Camb. Frente - Roda - Camb. Atrás)",
      "niveis": [
        "Cambalhota à Frente bem executada, isolada",
        "Roda bem executada, isolada",
        "Cambalhota Atrás bem executada, isolada",
        "Duas das três destrezas já ligadas em sequência",
        "Objetivo alcançado - série completa ligada (Camb.Frente-Roda-Camb.Atrás)"
      ]
    },
    {
      "id": "solo-2",
      "categoria": "Solo",
      "nome": "Grupo 2 - Série Nível 5 (Pino-Camb. - Roda - Rondada - Camb. Atrás)",
      "niveis": [
        "Pino-Cambalhota isolado e controlado",
        "Roda e Rondada isoladas e controladas",
        "Pino-Cambalhota + Roda já ligados",
        "Roda + Rondada + Camb. Atrás já ligados",
        "Objetivo alcançado - série completa ligada"
      ]
    },
    {
      "id": "solo-3",
      "categoria": "Solo",
      "nome": "Grupo 3 - Série Nível 6 (Rondada Flick)",
      "niveis": [
        "Rondada consolidada e potente",
        "Flick isolado, com assistência direta",
        "Rondada Flick com assistência",
        "Rondada Flick com mini-assistência",
        "Objetivo alcançado - Rondada Flick sozinha e controlada"
      ]
    },
    {
      "id": "solo-4",
      "categoria": "Solo",
      "nome": "Pino de Cabeça",
      "niveis": [
        "Pino de Cabeça na parede",
        "Pino de Cabeça com assistência",
        "Pino de Cabeça sozinha, apoio breve",
        "Pino de Cabeça sozinha, equilíbrio 3-5 seg",
        "Objetivo alcançado - Pino de Cabeça sozinha, equilíbrio estável"
      ]
    },
    {
      "id": "tumbling-1",
      "categoria": "Tumbling",
      "nome": "Grupo 1 - Roda / Rondada em Iniciação",
      "niveis": [
        "Roda bem executada e alinhada",
        "Rondada com assistência mão-a-mão",
        "Rondada com mini-assistência",
        "Rondada iniciada sozinha, ainda desalinhada",
        "Objetivo alcançado - Rondada iniciada de forma autónoma e alinhada"
      ]
    },
    {
      "id": "tumbling-2",
      "categoria": "Tumbling",
      "nome": "Grupo 2 - Rondada Flick com Assistência",
      "niveis": [
        "Rondada consolidada e potente",
        "Flick no mini-trampolim com assistência",
        "Flick no colchão com assistência direta",
        "Rondada + Flick já ligados, com assistência",
        "Objetivo alcançado - Rondada Flick fluida, com assistência"
      ]
    },
    {
      "id": "tumbling-3",
      "categoria": "Tumbling",
      "nome": "Grupo 3 - Flick Sozinha no Mini + Rondada Flick",
      "niveis": [
        "Flick no mini-trampolim sozinha",
        "Flick no colchão com mini-assistência",
        "Rondada Flick com mini-assistência",
        "Rondada Flick sozinha, receção instável",
        "Objetivo alcançado - Flick sozinha no mini e Rondada Flick sozinha no colchão"
      ]
    },
    {
      "id": "acrob-tica-1",
      "categoria": "Acrobática",
      "nome": "Figura de Acrobática de 3 Pessoas",
      "niveis": [
        "Posições individuais de base / meio / topo dominadas",
        "Montagem da figura com assistência total do treinador",
        "Montagem com assistência ligeira, mantém 2-3 seg",
        "Montagem sozinhas, mantém 3-5 seg, com pequena instabilidade",
        "Objetivo alcançado - figura de 3 montada e mantida com controlo"
      ]
    }
  ],
  "periods": [
    {
      "id": "set-dez",
      "label": "Set - Dez 2026",
      "sessions": [
        {
          "date": "2026-09-02",
          "aquecimento": "Normal",
          "jogo": "Mata",
          "alongamento": "Normal",
          "micro": "Adaptação",
          "formato": null,
          "ginastica": "Apresentações e regras de segurança; reconhecimento do espaço e dos aparelhos; jogos de confiança; revisão de posições base (extensão, engrupado, carpa).",
          "fase": "Fase 0 - Adaptação",
          "faseKey": "0"
        },
        {
          "date": "2026-09-04",
          "aquecimento": "Normal",
          "jogo": "Peixinhos",
          "alongamento": "Normal",
          "micro": "Adaptação",
          "formato": null,
          "ginastica": "Revisão de saltos base no mini-trampolim e cambalhotas à frente/atrás no solo; avaliação inicial de nível por atleta para formação dos Grupos 1, 2 e 3.",
          "fase": "Fase 0 - Adaptação",
          "faseKey": "0"
        },
        {
          "date": "2026-09-09",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Extensão, Engrupado, Carpa Afastada e Carpa Junta; (2) Plinto com Reuter - Coelho e Coelho Eixo; (3) Solo de apoio - alinhamento corporal e postura de salto. Foco em segurança e postura básica de queda.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-09-11",
          "aquecimento": "Normal",
          "jogo": "Estátua Musical",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Solo",
          "formato": "Filas",
          "ginastica": "Filas: Cambalhota à Frente, Cambalhota Atrás e Roda em fila, foco no alinhamento; Barquinho e Avião para reforço das bases, uma atleta de cada vez.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-09-16",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Postos de equilíbrio individual -> figura de 2 elementos assistida -> Mãozotas; toda a turma em rotação.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-09-18",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Extensão, Engrupado, Carpa Afastada e Carpa Junta; (2) Plinto com Reuter - Coelho e Coelho Eixo; (3) Solo de apoio - alinhamento corporal e postura de salto. Foco em segurança e postura básica de queda.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-09-23",
          "aquecimento": "Normal",
          "jogo": "Apanhada",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Filas",
          "ginastica": "Filas: Cambalhota à Frente, Cambalhota Atrás e Roda em fila, foco no alinhamento; Barquinho e Avião para reforço das bases, uma atleta de cada vez.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-09-25",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Estações",
          "ginastica": "Estações: Roda técnica (alinhamento de mãos e pernas) - Grupo 1; iniciação à Rondada com assistência mão-a-mão do treinador. Reforço de bases: Barquinho, Avião e prancha.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-09-30",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Mini-trampolim (Extensão - Engrupado) -> plinto baixo (Coelho) -> colchão (rolamento de segurança); 2-3 voltas completas.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-10-02",
          "aquecimento": "Normal",
          "jogo": "Crocodilo",
          "alongamento": "Preparação Core",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Cambalhota à Frente e Cambalhota Atrás; (2) Grupo 2 - Pino-Cambalhota e Roda; (3) Grupo 3 - Rondada e potência de saída. Pino de Cabeça na parede para toda a turma; Barquinho e Avião como reforço de bases.",
          "fase": "Fase 1 - Adaptação e Fundamentos",
          "faseKey": "1"
        },
        {
          "date": "2026-10-07",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Filas",
          "ginastica": "Filas: Figuras de 2 elementos em fila, quase autónomas; iniciação à figura de 3 elementos com assistência total. Mãozotas com assistência.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-09",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Mini-trampolim (saltos base) -> plinto (Coelho Eixo) -> plano inclinado (cambalhota) -> regresso à fila; repetir 2-3 voltas por níveis.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-14",
          "aquecimento": "Normal",
          "jogo": "Futebol Humano",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Roda isolada e ligação Cambalhota à Frente + Roda; (2) Grupo 2 - Pino-Cambalhota e Roda (rumo à Série Nível 5); (3) Grupo 3 - Rondada consolidada, preparação para Flick. Pino de Cabeça com assistência; Estrela como variante da Carpa Afastada.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-16",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Filas",
          "ginastica": "Filas: Rondada em fila por grupo (com/sem assistência); Flick no mini-trampolim em fila para os Grupos 2 e 3.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-21",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - consolidação dos saltos base (Grupo 1) e iniciação a Meia Pirueta; (2) Plinto com Reuter - iniciação ao Salto Cambalhota (Grupo 1) e ao Salto ao Eixo (Grupo 2) com assistência; (3) Plano inclinado - cambalhota como preparação para Mortal à Frente (Grupo 2).",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-23",
          "aquecimento": "Normal",
          "jogo": "Corrida de Sacos",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Roda -> Pino-Cambalhota -> Rondada -> Pino de Cabeça na parede; cada atleta passa pelos 4 postos ao seu nível.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-28",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Estações",
          "ginastica": "Estações: Consolidação das figuras de 2 elementos, já com menor assistência; iniciação à montagem da figura de 3 elementos (objetivo da turma) com assistência total do treinador. Mãozotas - consolidação da pega e do alinhamento com assistência.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-10-30",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Filas",
          "ginastica": "Filas: Mini-trampolim: saltos base + Meia Pirueta em fila; Plinto: Coelho Eixo e iniciação ao Salto Cambalhota, com assistência direta a cada passagem.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-04",
          "aquecimento": "Normal",
          "jogo": "Semáforo",
          "alongamento": "Preparação Core",
          "micro": "Solo",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Roda -> Pino-Cambalhota -> Rondada -> Pino de Cabeça na parede; cada atleta passa pelos 4 postos ao seu nível.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-06",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Rondada em iniciação com assistência; (2) Grupo 2 - Rondada consolidada + Flick no mini-trampolim com assistência; (3) Grupo 3 - Flick no mini-trampolim sozinha, trabalho de potência de saída.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-11",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Filas",
          "ginastica": "Filas: Mini-trampolim: saltos base + Meia Pirueta em fila; Plinto: Coelho Eixo e iniciação ao Salto Cambalhota, com assistência direta a cada passagem.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-13",
          "aquecimento": "Normal",
          "jogo": "Jogo do Espelho",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Roda isolada e ligação Cambalhota à Frente + Roda; (2) Grupo 2 - Pino-Cambalhota e Roda (rumo à Série Nível 5); (3) Grupo 3 - Rondada consolidada, preparação para Flick. Pino de Cabeça com assistência; Estrela como variante da Carpa Afastada.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-18",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Figura de 2 elementos -> iniciação à figura de 3 elementos assistida -> Mãozotas; rotação de pares/trios.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-20",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - consolidação dos saltos base (Grupo 1) e iniciação a Meia Pirueta; (2) Plinto com Reuter - iniciação ao Salto Cambalhota (Grupo 1) e ao Salto ao Eixo (Grupo 2) com assistência; (3) Plano inclinado - cambalhota como preparação para Mortal à Frente (Grupo 2).",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-25",
          "aquecimento": "Normal",
          "jogo": "Cabra-Cega",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Filas",
          "ginastica": "Filas: Roda e ligação Cambalhota-Roda em fila (Grupo 1); Pino-Cambalhota e Rondada em fila (Grupos 2/3); Pino de Cabeça com assistência para todas.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-11-27",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Rondada (colchão) -> Flick assistido (mini-trampolim) -> receção controlada; por níveis dentro do mesmo circuito.",
          "fase": "Fase 2 - Desenvolvimento",
          "faseKey": "2"
        },
        {
          "date": "2026-12-02",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Mortal à Frente com assistência/cinto (Grupo 2) e iniciação ao 3/4 Mortal com assistência (Grupo 3); (2) Plinto com Reuter - Salto ao Eixo com mini-assistência (Grupo 2) e Salto de Apoio Facial com assistência (Grupo 3); (3) Grupo 1 - sequência completa dos saltos base, incluindo Pirueta.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-04",
          "aquecimento": "Normal",
          "jogo": "Bola ao Capitão",
          "alongamento": "Preparação Core",
          "micro": "Solo",
          "formato": "Filas",
          "ginastica": "Filas: Série Nível 3 em fila (Grupo 1); Rondada + Cambalhota Atrás ligadas em fila (Grupo 2); Rondada Flick assistida (Grupo 3). Pino-Ponte e Aranha Atrás para reforço.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-09",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Estações",
          "ginastica": "Estações: Montagem da figura de 3 elementos (objetivo da turma) com assistência total, foco em base + meio + topo; mantém 2-3seg. Mãozotas com mini-assistência para os pares existentes.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-11",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Mini-trampolim (Mortal à Frente / 3/4 Mortal assistidos) -> plinto (Salto ao Eixo / Apoio Facial) -> colchão (queda controlada).",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-16",
          "aquecimento": "Normal",
          "jogo": "Caça ao Tesouro",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Série Nível 3 ligada (Cambalhota à Frente - Roda - Cambalhota Atrás); (2) Grupo 2 - Rondada e Cambalhota Atrás ligadas à sequência (Série Nível 5); (3) Grupo 3 - Rondada Flick com assistência direta. Pino de Cabeça sozinha com apoio breve; Pino-Ponte, Pino-Meia e Aranha Atrás como preparação de força e controlo.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-18",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Filas",
          "ginastica": "Filas: Rondada Flick em fila por grupo (assistência direta a mini-assistência); Flicks no mini-trampolim para todas, como transferência de rotação.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-23",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Mini-trampolim (Mortal à Frente / 3/4 Mortal assistidos) -> plinto (Salto ao Eixo / Apoio Facial) -> colchão (queda controlada).",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2026-12-30",
          "aquecimento": "Normal",
          "jogo": "Cores",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Série Nível 3 ligada (Cambalhota à Frente - Roda - Cambalhota Atrás); (2) Grupo 2 - Rondada e Cambalhota Atrás ligadas à sequência (Série Nível 5); (3) Grupo 3 - Rondada Flick com assistência direta. Pino de Cabeça sozinha com apoio breve; Pino-Ponte, Pino-Meia e Aranha Atrás como preparação de força e controlo.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        }
      ]
    },
    {
      "id": "jan-mar",
      "label": "Jan - Mar 2027",
      "sessions": [
        {
          "date": "2027-01-06",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Filas",
          "ginastica": "Filas: Figura de 3 elementos em fila, com assistência total, foco na entrada e saída da figura; Mãozotas com mini-assistência.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-08",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Mortal à Frente com assistência/cinto (Grupo 2) e iniciação ao 3/4 Mortal com assistência (Grupo 3); (2) Plinto com Reuter - Salto ao Eixo com mini-assistência (Grupo 2) e Salto de Apoio Facial com assistência (Grupo 3); (3) Grupo 1 - sequência completa dos saltos base, incluindo Pirueta.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-13",
          "aquecimento": "Normal",
          "jogo": "Bola Grande",
          "alongamento": "Preparação Core",
          "micro": "Solo",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Série de solo (Grupo 1/2) -> Rondada Flick assistida (Grupo 3) -> Pino de Cabeça -> Pino-Ponte / Aranha Atrás.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-15",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Rondada iniciada sozinha; (2) Grupo 2 - Rondada Flick com assistência direta, ligação Rondada-Flick; (3) Grupo 3 - Rondada Flick com mini-assistência. Treino de Flicks no mini-trampolim para todos os grupos, como transferência da sensação de rotação.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-20",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Filas",
          "ginastica": "Filas: Mini-trampolim: Mortal à Frente com assistência (Grupo 2) e 3/4 Mortal assistido (Grupo 3), em fila; Plinto: Salto ao Eixo e Salto de Apoio Facial com mini-assistência.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-22",
          "aquecimento": "Normal",
          "jogo": "Estátua Musical",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Solo",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Série de solo (Grupo 1/2) -> Rondada Flick assistida (Grupo 3) -> Pino de Cabeça -> Pino-Ponte / Aranha Atrás.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-27",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Estações",
          "ginastica": "Estações: Montagem da figura de 3 elementos (objetivo da turma) com assistência total, foco em base + meio + topo; mantém 2-3seg. Mãozotas com mini-assistência para os pares existentes.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-01-29",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Filas",
          "ginastica": "Filas: Mini-trampolim: Mortal à Frente com assistência (Grupo 2) e 3/4 Mortal assistido (Grupo 3), em fila; Plinto: Salto ao Eixo e Salto de Apoio Facial com mini-assistência.",
          "fase": "Fase 3 - Consolidação",
          "faseKey": "3"
        },
        {
          "date": "2027-02-03",
          "aquecimento": "Normal",
          "jogo": "Apanhada",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Série Nível 3 pronta para avaliação; (2) Grupo 2 - Série Nível 5 completa e ligada; (3) Grupo 3 - Rondada Flick com mini-assistência, rumo à autonomia. Pino de Cabeça autónomo com equilíbrio de 3-5seg; Aranha Atrás e Aranha à Frente como preparação de flexibilidade de ombros.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-05",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Rondada -> Rondada Flick -> Flick no mini-trampolim, com registo do nível atingido por atleta.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-10",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Mortal à Frente autónomo (Grupo 2) e 3/4 Mortal com mini-assistência (Grupo 3); (2) Plinto com Reuter - Salto de Apoio Facial autónomo (Grupo 3) e Salto ao Eixo autónomo (Grupo 2); (3) Grupo 1 - sequência de saltos base para avaliação no Torneio de Objetivos.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-12",
          "aquecimento": "Normal",
          "jogo": "Crocodilo",
          "alongamento": "Preparação Core",
          "micro": "Solo",
          "formato": "Filas",
          "ginastica": "Filas: Séries completas em fila por grupo (Nível 3 / Nível 5 / Rondada Flick), com afinação final para o Torneio de Objetivos; Pino de Cabeça autónomo.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-17",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Figura de 3 elementos -> Mãozotas, com registo do nível atingido por trio/par.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-19",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Mortal à Frente autónomo (Grupo 2) e 3/4 Mortal com mini-assistência (Grupo 3); (2) Plinto com Reuter - Salto de Apoio Facial autónomo (Grupo 3) e Salto ao Eixo autónomo (Grupo 2); (3) Grupo 1 - sequência de saltos base para avaliação no Torneio de Objetivos.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-24",
          "aquecimento": "Normal",
          "jogo": "Futebol Humano",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Solo",
          "formato": "Filas",
          "ginastica": "Filas: Séries completas em fila por grupo (Nível 3 / Nível 5 / Rondada Flick), com afinação final para o Torneio de Objetivos; Pino de Cabeça autónomo.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-02-26",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Rondada autónoma e alinhada, pronta para avaliação; (2) Grupo 2 - Rondada Flick com mini-assistência, rumo à autonomia; (3) Grupo 3 - Flick sozinha no mini-trampolim + Rondada Flick sozinha no colchão, para avaliação no Torneio de Objetivos. Treino de Flicks no mini-trampolim para todos.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-03",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Mini-trampolim -> plinto -> solo, com registo do nível atingido por atleta, rumo ao Torneio de Objetivos.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-05",
          "aquecimento": "Normal",
          "jogo": "Corrida de Sacos",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Série Nível 3 pronta para avaliação; (2) Grupo 2 - Série Nível 5 completa e ligada; (3) Grupo 3 - Rondada Flick com mini-assistência, rumo à autonomia. Pino de Cabeça autónomo com equilíbrio de 3-5seg; Aranha Atrás e Aranha à Frente como preparação de flexibilidade de ombros.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-10",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Filas",
          "ginastica": "Filas: Figura de 3 elementos em fila, assistência ligeira, afinação final para o Torneio de Objetivos; Mãozotas quase autónomas.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-12",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Mini-trampolim -> plinto -> solo, com registo do nível atingido por atleta, rumo ao Torneio de Objetivos.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-17",
          "aquecimento": "Normal",
          "jogo": "Semáforo",
          "alongamento": "Preparação Core",
          "micro": "Solo",
          "formato": "Estações",
          "ginastica": "Estações: (1) Grupo 1 - Série Nível 3 pronta para avaliação; (2) Grupo 2 - Série Nível 5 completa e ligada; (3) Grupo 3 - Rondada Flick com mini-assistência, rumo à autonomia. Pino de Cabeça autónomo com equilíbrio de 3-5seg; Aranha Atrás e Aranha à Frente como preparação de flexibilidade de ombros.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-19",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Tumbling",
          "formato": "Filas",
          "ginastica": "Filas: Rondada / Rondada Flick em fila por grupo, afinação final para o Torneio de Objetivos; Flicks no mini-trampolim para todas.",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-24",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Estações",
          "ginastica": "Estações: (1) Mini-trampolim - Mortal à Frente autónomo (Grupo 2) e 3/4 Mortal com mini-assistência (Grupo 3); (2) Plinto com Reuter - Salto de Apoio Facial autónomo (Grupo 3) e Salto ao Eixo autónomo (Grupo 2); (3) Grupo 1 - sequência de saltos base para avaliação no Torneio de Objetivos. Última sessão de afinação antes do Torneio de Objetivos (avaliação na sessão seguinte).",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        },
        {
          "date": "2027-03-31",
          "aquecimento": "Normal",
          "jogo": "Jogo do Espelho",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Torneio de Objetivos",
          "formato": null,
          "ginastica": "Torneio de Objetivos - avaliação final por estações (Mini-Trampolim, Plinto, Solo, Tumbling, Acrobática); registo do nível atingido (1-5) por atleta e por objetivo na folha \"Progresso de Objetivos\".",
          "fase": "Fase 4 - Refinamento e Torneio de Objetivos",
          "faseKey": "4"
        }
      ]
    },
    {
      "id": "abr-jul",
      "label": "Abr - Jul 2027",
      "sessions": [
        {
          "date": "2027-04-02",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Acrobática",
          "formato": "Estações",
          "ginastica": "Estações: Manutenção da figura de 3 elementos com autonomia crescente; Mãozotas autónomas para os pares mais avançados; introdução livre de uma figura de 4 elementos como desafio extra, para quem já domina o objetivo da turma.",
          "fase": "Fase 5 - Transição",
          "faseKey": "5"
        },
        {
          "date": "2027-04-07",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Trampolins",
          "formato": "Filas",
          "ginastica": "Filas: Manutenção em fila: saltos base, Mortal à Frente e 3/4 Mortal; introdução livre de Mortal Carpado para quem já domina o 3/4 Mortal.",
          "fase": "Fase 5 - Transição",
          "faseKey": "5"
        },
        {
          "date": "2027-04-09",
          "aquecimento": "Normal",
          "jogo": "Cabra-Cega",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Solo",
          "formato": "Circuito Geral",
          "ginastica": "Circuito Geral: Série de solo -> Ponte a partir de pé -> saltos de mão de iniciação, por níveis.",
          "fase": "Fase 5 - Transição",
          "faseKey": "5"
        },
        {
          "date": "2027-04-14",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 1/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-04-16",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema + Trampolins",
          "formato": "Filas",
          "ginastica": "Sarau - Revisão do Esquema (Parte 1/16) + Ginástica de Consolidação (Trampolins, Filas): Manutenção em fila: saltos base, Mortal à Frente e 3/4 Mortal; introdução livre de Mortal Carpado para quem já domina o 3/4 Mortal.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-04-21",
          "aquecimento": "Normal",
          "jogo": "Bola ao Capitão",
          "alongamento": "Preparação Core",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 2/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-04-23",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema + Solo",
          "formato": "Circuito Geral",
          "ginastica": "Sarau - Revisão do Esquema (Parte 2/16) + Ginástica de Consolidação (Solo, Circuito Geral): Série de solo -> Ponte a partir de pé -> saltos de mão de iniciação, por níveis.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-04-28",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 3/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-04-30",
          "aquecimento": "Normal",
          "jogo": "Caça ao Tesouro",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Esquema + Acrobática",
          "formato": "Filas",
          "ginastica": "Sarau - Revisão do Esquema (Parte 3/16) + Ginástica de Consolidação (Acrobática, Filas): Manutenção da figura de 3 elementos em fila; iniciação livre a uma figura de 4 elementos para os trios mais avançados.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-05",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 4/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-07",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema + Tumbling",
          "formato": "Estações",
          "ginastica": "Sarau - Revisão do Esquema (Parte 4/16) + Ginástica de Consolidação (Tumbling, Estações): Manutenção da Rondada Flick por grupo (com/sem assistência conforme o nível); treino de Flicks no mini-trampolim; introdução de novas progressões (ex.: rondada-flic-flac ligada, saída com giro).",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-12",
          "aquecimento": "Normal",
          "jogo": "Cores",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 5/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-14",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema + Trampolins",
          "formato": "Estações",
          "ginastica": "Sarau - Revisão do Esquema (Parte 5/16) + Ginástica de Consolidação (Trampolins, Estações): Livres, de manutenção, com saltos base (Grupo 1), Mortal à Frente e 3/4 Mortal (Grupos 2/3) já autónomos; introdução de progressão nova consoante o nível de cada atleta (ex.: Mortal Carpado, dupla pirueta).",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-19",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 6/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-21",
          "aquecimento": "Normal",
          "jogo": "Bola Grande",
          "alongamento": "Preparação Core",
          "micro": "Esquema + Solo",
          "formato": "Estações",
          "ginastica": "Sarau - Revisão do Esquema (Parte 6/16) + Ginástica de Consolidação (Solo, Estações): Manutenção das séries de nível já alcançadas por grupo; Pino de Cabeça autónomo; introdução de novas progressões consoante o nível (ex.: ponte a partir de pé, saltos de mão de iniciação).",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-26",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 7/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-05-28",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema + Acrobática",
          "formato": "Circuito Geral",
          "ginastica": "Sarau - Revisão do Esquema (Parte 7/16) + Ginástica de Consolidação (Acrobática, Circuito Geral): Figura de 3 elementos -> Mãozotas -> desafio de figura de 4 elementos (trios avançados).",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-06-02",
          "aquecimento": "Normal",
          "jogo": "Estátua Musical",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 8/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-06-04",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema + Tumbling",
          "formato": "Filas",
          "ginastica": "Sarau - Revisão do Esquema (Parte 8/16) + Ginástica de Consolidação (Tumbling, Filas): Manutenção em fila: Rondada Flick e Flicks no mini-trampolim; iniciação à ligação rondada-flic-flac para quem já domina os objetivos do grupo.",
          "fase": "Fase 6a - Sarau (Aprendizagem)",
          "faseKey": "6a"
        },
        {
          "date": "2027-06-09",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 9/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-06-11",
          "aquecimento": "Normal",
          "jogo": "Apanhada",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Esquema + Trampolins",
          "formato": "Circuito Geral",
          "ginastica": "Sarau - Revisão do Esquema (Parte 9/16) + Ginástica de Consolidação (Trampolins, Circuito Geral): Mini-trampolim -> plinto -> solo, com desafios novos por atleta (Mortal Carpado, saltos de mão).",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-06-16",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 10/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-06-18",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema + Solo",
          "formato": "Filas",
          "ginastica": "Sarau - Revisão do Esquema (Parte 10/16) + Ginástica de Consolidação (Solo, Filas): Manutenção das séries em fila; Ponte a partir de pé e saltos de mão de iniciação para quem já domina os objetivos do grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-06-23",
          "aquecimento": "Normal",
          "jogo": "Crocodilo",
          "alongamento": "Preparação Core",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 11/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-06-25",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema + Acrobática",
          "formato": "Estações",
          "ginastica": "Sarau - Revisão do Esquema (Parte 11/16) + Ginástica de Consolidação (Acrobática, Estações): Manutenção da figura de 3 elementos com autonomia crescente; Mãozotas autónomas para os pares mais avançados; introdução livre de uma figura de 4 elementos como desafio extra, para quem já domina o objetivo da turma.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-06-30",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 12/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-02",
          "aquecimento": "Normal",
          "jogo": "Futebol Humano",
          "alongamento": "Preparação Membros Superiores",
          "micro": "Esquema + Tumbling",
          "formato": "Estações",
          "ginastica": "Sarau - Revisão do Esquema (Parte 12/16) + Ginástica de Consolidação (Tumbling, Estações): Manutenção da Rondada Flick por grupo (com/sem assistência conforme o nível); treino de Flicks no mini-trampolim; introdução de novas progressões (ex.: rondada-flic-flac ligada, saída com giro).",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-07",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 13/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-09",
          "aquecimento": "Cordas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema + Trampolins",
          "formato": "Estações",
          "ginastica": "Sarau - Revisão do Esquema (Parte 13/16) + Ginástica de Consolidação (Trampolins, Estações): Livres, de manutenção, com saltos base (Grupo 1), Mortal à Frente e 3/4 Mortal (Grupos 2/3) já autónomos; introdução de progressão nova consoante o nível de cada atleta (ex.: Mortal Carpado, dupla pirueta).",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-14",
          "aquecimento": "Normal",
          "jogo": "Corrida de Sacos",
          "alongamento": "Preparação Membros Inferiores",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 14/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-16",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema + Solo",
          "formato": "Circuito Geral",
          "ginastica": "Sarau - Revisão do Esquema (Parte 14/16) + Ginástica de Consolidação (Solo, Circuito Geral): Série de solo -> Ponte a partir de pé -> saltos de mão de iniciação, por níveis.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-21",
          "aquecimento": "Bolas",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 15/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-23",
          "aquecimento": "Normal",
          "jogo": "Semáforo",
          "alongamento": "Preparação Core",
          "micro": "Esquema + Acrobática",
          "formato": "Filas",
          "ginastica": "Sarau - Revisão do Esquema (Parte 15/16) + Ginástica de Consolidação (Acrobática, Filas): Manutenção da figura de 3 elementos em fila; iniciação livre a uma figura de 4 elementos para os trios mais avançados.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-28",
          "aquecimento": "Normal",
          "jogo": "--------------------",
          "alongamento": "Normal",
          "micro": "Esquema",
          "formato": null,
          "ginastica": "Sarau - Ensaio do Esquema (Parte 16/16): aprendizagem de contagens, formações e transições coreográficas; trabalho de memorização e sincronismo em grupo.",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        },
        {
          "date": "2027-07-30",
          "aquecimento": "Arcos",
          "jogo": "--------------------",
          "alongamento": "Flexibilidade",
          "micro": "Esquema + Tumbling",
          "formato": "Circuito Geral",
          "ginastica": "Sarau - Revisão do Esquema (Parte 16/16) + Ginástica de Consolidação (Tumbling, Circuito Geral): Rondada -> Rondada Flick -> Flick no mini-trampolim -> desafio novo (flic-flac ligado).",
          "fase": "Fase 6b - Sarau (Consolidação)",
          "faseKey": "6b"
        }
      ]
    }
  ],
  "phases": [
    {
      "key": "0",
      "title": "Fase 0 - Adaptação",
      "description": "revisão geral e avaliação inicial de nível, para formação dos Grupos 1, 2 e 3 em cada valência.",
      "startDate": "2026-09-02",
      "endDate": "2026-09-04"
    },
    {
      "key": "1",
      "title": "Fase 1 - Adaptação e Fundamentos",
      "description": "consolidar postura, alinhamento corporal e elementos base em todas as valências (cambalhotas, saltos base, roda); avaliação inicial de nível por atleta e formação dos Grupos 1, 2 e 3.",
      "startDate": "2026-09-09",
      "endDate": "2026-10-02"
    },
    {
      "key": "2",
      "title": "Fase 2 - Desenvolvimento",
      "description": "introdução assistida dos objetivos de grupo (Mortal à Frente, Rondada Flick, Salto ao Eixo, Salto de Apoio Facial, Figura de 3); consolidação da Série Nível 3 e Nível 5 em Solo.",
      "startDate": "2026-10-07",
      "endDate": "2026-11-27"
    },
    {
      "key": "3",
      "title": "Fase 3 - Consolidação",
      "description": "redução progressiva da assistência (de assistência direta para mini-assistência); trabalho de potência e técnica de saída em Trampolins e Tumbling; Pino de Cabeça autónomo.",
      "startDate": "2026-12-02",
      "endDate": "2027-01-29"
    },
    {
      "key": "4",
      "title": "Fase 4 - Refinamento e Torneio de Objetivos",
      "description": "autonomia crescente nos objetivos de grupo; avaliação final no Torneio de Objetivos (31 de março de 2027).",
      "startDate": "2027-02-03",
      "endDate": "2027-03-31"
    },
    {
      "key": "5",
      "title": "Fase 5 - Transição",
      "description": "manutenção dos objetivos já alcançados; introdução de novas progressões consoante o nível de cada atleta; preparação para o início dos ensaios do Sarau (a partir de meados de abril).",
      "startDate": "2027-04-02",
      "endDate": "2027-04-09"
    },
    {
      "key": "6a",
      "title": "Fase 6a - Sarau (Aprendizagem)",
      "description": "aprendizagem e ensaio do esquema de exibição (1x/semana, à quarta-feira) + esquema com ginástica de consolidação e novas progressões (1x/semana, à sexta-feira).",
      "startDate": "2027-04-14",
      "endDate": "2027-06-04"
    },
    {
      "key": "6b",
      "title": "Fase 6b - Sarau (Consolidação)",
      "description": "ensaios gerais do esquema completo, afinação de contagens e formações + ginástica de consolidação e manutenção dos objetivos alcançados, rumo à apresentação no Sarau de final de ano.",
      "startDate": "2027-06-09",
      "endDate": "2027-07-30"
    }
  ]
};


# Ganho de Capital - Desafio Técnico Nubank

## Visão Geral
Este projeto implementa uma aplicação de linha de comando (CLI) que calcula o imposto sobre ganhos de capital em operações de compra e venda de ações no mercado financeiro. A aplicação lê operações no formato JSON e retorna o imposto calculado para cada operação de venda.

## Regras de Negócio
O cálculo do imposto sobre ganhos de capital segue as seguintes regras:

- O imposto é de 20% sobre o lucro obtido em operações de venda, desde que o valor total da venda exceda R$ 20.000,00.
- O preço médio ponderado das ações deve ser recalculado após cada compra.
- Prejuízos acumulados podem ser deduzidos de lucros futuros, até que todo o prejuízo seja deduzido.
- Nenhum imposto é aplicado em operações de compra.
- Vendas com valor total inferior a R$ 20.000,00 não pagam imposto, mesmo que tenham lucro.

Exemplo de operação:

```json
[{"operation": "buy", "unit-cost": 10.00, "quantity": 10000},
 {"operation": "sell", "unit-cost": 20.00, "quantity": 5000}]
```

Resultado:
```json
[{"tax": 0.00}, {"tax": 10000.00}]
```

## Instalação
Para rodar este projeto, siga as instruções abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/ganho-de-capital.git
   cd ganho-de-capital
   ```

2. Instale as dependências utilizando o Yarn ou npm:
   ```bash
   yarn install
   ```

## Como Executar o Projeto

1. Para executar a aplicação e processar as operações de compra e venda:
   ```bash
   yarn start
   ```

2. O arquivo `input.txt` deve conter as operações em formato JSON, uma operação por linha.

## Executando os Testes

Para rodar os testes automatizados:

```bash
yarn test
```

Para gerar um relatório de cobertura de testes:
```bash
yarn test --coverage
```

## Estrutura do Projeto
O projeto está estruturado da seguinte forma:

- **src/business**: Contém a lógica principal da calculadora de ganho de capital.
  - `CapitalGainsCalculator.ts`: Classe responsável pelo cálculo do imposto de ganho de capital.
  
- **src/input**: Contém o manipulador de entrada de dados.
  - `InputHandler.ts`: Responsável por processar as operações de entrada.

- **src/operations**: Implementa as diferentes operações de compra e venda.
  - `BuyOperation.ts`: Classe que representa a operação de compra.
  - `SellOperation.ts`: Classe que representa a operação de venda.

- **src/output**: Formata os resultados.
  - `OutputFormatter.ts`: Responsável por gerar a saída formatada.

- **src/tax**: Contém as estratégias de cálculo de imposto.
  - `ExemptTaxStrategy.ts`: Calcula a isenção de impostos para vendas abaixo de R$ 20.000,00.
  - `SimpleTaxStrategy.ts`: Calcula o imposto padrão de 20%.

- **src/types**: Definições de tipos e interfaces.
  - `Operation.ts`: Define o tipo para operações de compra e venda.

## Notas Adicionais
- O programa não depende de banco de dados externo.
- Arredondamento dos números decimais deve ser feito para duas casas.
- O estado do programa é gerenciado em memória e resetado a cada execução.
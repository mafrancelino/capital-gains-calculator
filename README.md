
# Calculadora de Ganho de Capital - Desafio Técnico Nubank

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

## Como Instalar

### Pré-requisitos

1. **Node.js**: O projeto requer que você tenha o Node.js instalado na sua máquina. Caso ainda não o tenha, faça o download e instale a partir do [site oficial do Node.js](https://nodejs.org/).

2. **Yarn**: O projeto utiliza o gerenciador de pacotes Yarn. Para instalar o Yarn, execute o seguinte comando:

   ```bash
   npm install -g yarn
   ```

### Instalação do Projeto

Para rodar este projeto, siga os passos abaixo:

1. Instale as dependências utilizando o Yarn:

   ```bash
   yarn install
   ```

2. Para executar a aplicação e processar as operações de compra e venda:

   ```bash
   yarn start < input.txt
   ```

## Como Executar os Testes

Para rodar os testes automatizados, utilize o seguinte comando:

```bash
yarn test
```
## Decisões Técnicas e Arquiteturais

### Design Orientado a Objetos e Transparência Referencial

Este projeto segue um design **orientado a objetos**, com foco em modularidade e facilidade de manutenção. Cada componente do sistema (por exemplo, as estratégias de cálculo de imposto e as operações de compra e venda) é encapsulado em classes com responsabilidades bem definidas. Essa separação de responsabilidades facilita a manutenção, testes e extensão do código.

Além disso, o projeto aplica **transparência referencial** através do uso de funções puras em cálculos essenciais, como `calculateGrossProfit` e `calculateNewWeightedAverageCost`. Essas funções são livres de efeitos colaterais, garantindo que o mesmo resultado seja sempre retornado para as mesmas entradas. Isso torna o sistema mais previsível e fácil de testar.

### Sistema Modular e Escalável

O sistema foi projetado para ser **modular** e facilmente extensível. O uso de interfaces para operações de trade (`TradeOperation`) e estratégias de taxação (`TaxStrategy`) permite a adição de novos tipos de operações ou regras fiscais com alterações mínimas no código existente. Isso garante que o sistema possa crescer e se adaptar a novos requisitos sem impactar significativamente a arquitetura atual.

Essa modularidade também suporta **escalabilidade**. À medida que o sistema evolui, diferentes componentes, como as estratégias fiscais ou o processamento de entrada, podem ser substituídos ou otimizados de forma independente, permitindo a adição de novas funcionalidades com baixo impacto no restante do sistema.

###### Padrões Arquiteturais Usados

Strategy Pattern (Padrão de Estratégia):
O cálculo do imposto sobre ganhos de capital utiliza o padrão Strategy para separar a lógica de taxação do restante do sistema. Existem diferentes regras de tributação, como isenção para vendas abaixo de R$ 20.000,00 e a aplicação de uma alíquota padrão de 20% para lucros acima desse valor. Essas regras são implementadas em classes como ExemptTaxStrategy e SimpleTaxStrategy. Isso torna o sistema flexível e permite que novas estratégias de taxação sejam adicionadas no futuro sem modificar o código existente.

Factory Pattern (Padrão de Fábrica):
O Factory Pattern é usado para criar instâncias das operações de trade (BuyOperation e SellOperation). Isso permite que o sistema crie dinamicamente os objetos corretos de operação, com base nos dados de entrada. Dessa forma, o código fica mais flexível e desacoplado, já que a criação de novos tipos de operação (como ShortSellOperation, por exemplo) pode ser facilmente incorporada ao sistema sem impactar outras partes do código.

Command Pattern (Padrão de Comando - Implícito):
O sistema segue, de maneira implícita, o Command Pattern, pois trata cada operação de trade (como compra ou venda) como um comando que pode ser executado. As operações possuem o método execute, que encapsula a lógica de execução de cada tipo de operação. Esse padrão pode ser estendido para incluir recursos adicionais, como desfazer ou refazer operações, caso o sistema precise evoluir nesse sentido.
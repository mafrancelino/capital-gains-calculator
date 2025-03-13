
# Calculadora de Ganho de Capital 

## Visão Geral

Esta CLI calcula o imposto sobre ganhos de capital em operações de compra e venda de ações com base em regras fiscais.

## Regras de Negócio

- Imposto de 20% sobre o lucro em vendas acima de R$ 20.000,00.
- Recalcula o preço médio ponderado após cada compra.
- Deduz prejuízos acumulados de lucros futuros.
- Vendas abaixo de R$ 20.000,00 são isentas.

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

1. Instale as dependências:
   ```bash
   yarn install
   ```

2. Execute a aplicação:
   ```bash
   yarn start < input.txt
   ```

## Testes

Execute testes unitários com:
```bash
yarn test
```

## Decisões Técnicas

- **Node.js**: Escolhido por ser rápido, eficiente e amplamente usado para operações assíncronas.
- **TypeScript**: Oferece segurança com tipagem estática, facilitando a manutenção.
- **Jest**: Útil para testes robustos com suporte a mocks e relatórios de cobertura.

### Padrões Usados

- **Strategy Pattern**: Desacopla as regras de cálculo de imposto. Facilita a inclusão de novas estratégias de tributação sem alterar o código principal.
- **Factory Pattern**: Cria dinamicamente operações de trade (`BuyOperation`, `SellOperation`), permitindo fácil extensão para novos tipos de operações.
- **Command Pattern**: Cada operação de trade é tratada como um comando (`execute`), o que simplifica a execução e manutenção.

### Modularidade, Orientação a Objetos e Transparência Referencial

A arquitetura combina orientação a objetos com transparência referencial. A separação de responsabilidades entre as classes permite uma modularidade clara, facilitando a manutenção e a extensão do sistema. Ao mesmo tempo, o uso de funções puras para cálculos garante transparência referencial, o que significa que as funções retornam sempre o mesmo resultado para os mesmos parâmetros, sem efeitos colaterais. Essa combinação torna o sistema previsível, mais fácil de testar e confiável, mantendo a flexibilidade da orientação a objetos para o crescimento do sistema.

### Inversão de Dependência

Utilizando interfaces para `TaxStrategy` e `TradeOperation`, o sistema mantém baixo acoplamento e permite que novas estratégias de cálculo de imposto ou operações de trade sejam facilmente adicionadas ou modificadas.

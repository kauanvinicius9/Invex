<script setup lang="ts">

import "./simulator.scss"

const {
  initialValue,
  anualProfitability,
  years,
  finalValue,
  profit
} = useSimulator()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)
}
</script>

<template>
  <main class="simulator">
    <Sidebar />
    <header class="simulator__header">
      <div>
        <span class="simulator__tag">Simulador</span>

        <h1>Simule seu investimento</h1>

        <p>
          Descubra quanto seu dinheiro pode valer ao longo do tempo.
        </p>
      </div>

      <div class="simulator__buttons">
        <NuxtLink to="/" class="simulator__back">
         Voltar
        </NuxtLink>

        <NuxtLink to="/dashboard" class="simulator__dashboard">
          Resultado
        </NuxtLink>
      </div>

    </header>

    <section class="simulator__content">

      <div class="panel">
        <div class="panel__header">
          <h2>Dados da simulação</h2>
          <p>Informe os valores do investimento.</p>
        </div>

        <div class="form">

          <div class="form__group">
            <label for="initialValue">
              Valor inicial (Máx. 10.000,00)
            </label>

            <div class="input-wrapper">
              <span>R$</span>

              <input id="initialValue" type="number" min="0" max="10000" v-model.number="initialValue"
                    @input="initialValue = initialValue === null ? null : Math.floor(Math.min(10000, Math.max(0, initialValue)))"/>
          </div>
        </div>

          <div class="form__group">
            <label for="anualProfitability">
              Rentabilidade anual (Máx. 100)
            </label>

            <div class="input-wrapper">
              <input id="anualProfitability" type="number" min="0" max="100" v-model.number="anualProfitability" step="0.1"
                    @input="anualProfitability = anualProfitability === null ? null : Math.floor(Math.min(100, Math.max(0, anualProfitability)))"/>
              <span>%</span>
            </div>
          </div>

          <div class="form__group">
            <label for="years">
              Tempo de investimento (Máx. 100)
            </label>

            <div class="input-wrapper">
              <input id="years" type="number" min="1" max="100" v-model.number="years"
                    @input="years = years === null ? null : Math.floor(Math.min(100, Math.max(1, years)))"/>
              <span>anos</span>
            </div>
          </div>

        </div>
      </div>

      <div class="panel panel--result">
        <div class="panel__header">
          <h2>Resultado estimado</h2>
          <p>Veja quanto seu investimento pode render</p>
        </div>

        <div class="result">
          <div class="result__main">
            <span>Patrimônio final</span>

            <strong>
              {{ formatCurrency(finalValue) }}
            </strong>
          </div>

          <div class="result__details">
            <div>
              <span>Valor investido</span>
              <strong>
                {{ formatCurrency(initialValue ?? 0) }}
              </strong>
            </div>

            <div>
              <span>Rendimento</span>
              <strong>
                {{ formatCurrency(profit) }}
              </strong>
            </div>

            <div>
              <span>Rentabilidade</span>
              <strong>
                {{ anualProfitability ?? 0 }}% ao ano
              </strong>
            </div>

            <div>
              <span>Período</span>
              <strong>
                {{ years ?? 0  }} anos
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="simulator__table-section">
      <InvestmentTable :result="{
          initialValue: initialValue ?? 0,
          anualProfitability: anualProfitability ?? 0,
          years: years ?? 1
      }" />
    </section>
  </main>

  <footer>
    <Footer/>
  </footer>
</template>

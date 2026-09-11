<script setup lang="ts">

import { computed } from "vue"
import "./simulator.scss"

const {
  initialValue,
  anualProfitability,
  years
} = useSimulator()

const finalValue = computed(() => {
  return initialValue.value * Math.pow(
    1 + anualProfitability.value / 100,
    years.value
  )
})

const profit = computed(() => {
  return finalValue.value - initialValue.value
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)
}

</script>

<template>
  <main class="simulator">

    <header class="simulator__header">
      <div>
        <span class="simulator__tag">Simulador</span>

        <h1>Simule seu investimento</h1>

        <p>
          Descubra quanto seu dinheiro pode valer ao longo do tempo.
        </p>
      </div>

      <NuxtLink to="/" class="simulator__back">
        Voltar
      </NuxtLink>
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

              <input id="initialValue" type="number" min="0" max="100" 
                          @input="initialValue = Math.min(10000, Number(initialValue))"/>
            </div>
          </div>

          <div class="form__group">
            <label for="profitability">
              Rentabilidade anual
            </label>

            <div class="input-wrapper">
              <input id="profitability" type="number" min="0" max="100" 
                          @input="anualProfitability = Math.min(100, Number(anualProfitability))"step="0.1"/>
              <span>%</span>
            </div>
          </div>

          <div class="form__group">
            <label for="years">
              Tempo de investimento
            </label>

            <div class="input-wrapper">
              <input id="years" type="number" min="1" max="100" @input="years = Math.min(100, Number(years))"/>
              <span>anos</span>
            </div>
          </div>

        </div>
      </div>

      <div class="panel panel--result">
        <div class="panel__header">
          <h2>Resultado estimado</h2>
          <p>Veja quanto seu investimento pode render.</p>
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
                {{ formatCurrency(initialValue) }}
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
                {{ anualProfitability }}% ao ano
              </strong>
            </div>

            <div>
              <span>Período</span>
              <strong>
                {{ years }} anos
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

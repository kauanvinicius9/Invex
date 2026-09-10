<script setup lang="ts">
import { computed, ref } from "vue";
import "./simulator.scss";

const investment = ref(12000)
const profitability = ref(10)
const years = ref(5)

const finalValue = computed(() => {
  return investment.value * Math.pow(
    1 + profitability.value / 100,
    years.value
  )
})

const profit = computed(() => {
  return finalValue.value - investment.value
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
            <label for="investment">
              Valor inicial
            </label>

            <div class="input-wrapper">
              <span>R$</span>

              <input id="investment" v-model.number="investment" type="number" min="0"/>
            </div>
          </div>

          <div class="form__group">
            <label for="profitability">
              Rentabilidade anual
            </label>

            <div class="input-wrapper">
              <input id="profitability" v-model.number="profitability" type="number" min="0" step="0.1"/>
              <span>%</span>
            </div>
          </div>

          <div class="form__group">
            <label for="years">
              Tempo de investimento
            </label>

            <div class="input-wrapper">
              <input id="years" v-model.number="years" type="number" min="1"/>
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
                {{ formatCurrency(investment) }}
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
                {{ profitability }}% ao ano
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

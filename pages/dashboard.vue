<script setup lang="ts">
import "./dashboard.scss";

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
    currency: "BRL",
  }).format(value);
};

const valueYear = computed(() => {
  return Array.from(
    { length: years.value + 1 },
    (_, year) => {
      return initialValue.value * Math.pow(
        1 + anualProfitability.value / 100,
        year
      )
    }
  )
})
</script>

<template>
  <main class="dashboard">
    <header class="dashboard__header">

      <div>
        <span class="dashboard__tag"> Dashboard </span>
        <h1>Seus investimentos</h1>
        <p>Acompanhe a evolução da sua simulação</p>
      </div>

      <NuxtLink to="" class="dashboard__back"> Nova simulação </NuxtLink>
    </header>

    <section class="dashboard__cards">
      <div class="card">
        <span class="card__label"> Investimento inicial </span>

        <strong class="card__value">
          {{ formatCurrency(initialValue) }}
        </strong>
      </div>

      <div class="card">
        <span class="card__label"> Rentabilidade anual </span>
        <strong class="card__value"> {{ anualProfitability }}% </strong>
      </div>

      <div class="card">
        <span class="card__label"> Rendimento </span>

        <strong class="card__value card__value--profit">
          {{ formatCurrency(profit) }}
        </strong>
      </div>

      <div class="card card--highlight">
        <span class="card__label"> Patrimônio final </span>

        <strong class="card__value">
          {{ formatCurrency(finalValue) }}
        </strong>
      </div>
    </section>

    <section class="dashboard__content">
      <div class="panel">
        <div class="panel__header">

          <div>
            <h2>Evolução do investimento</h2>
            <p>Projeção para {{ years }} anos</p>
          </div>
        </div>

        <div class="chart">
          <div v-for="(value, year) in valueYear" :key="year" class="chart__item">
            <div class="chart__bar-container">
              <div class="chart__bar" :style="{height: `${(value / finalValue) * 100}%`}"></div>
            </div>

            <strong>
              {{ formatCurrency(value) }}
            </strong>

            <span> Ano {{ year }} </span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel__header">
          <div>
            <h2>Resumo</h2>
            <p>Dados da simulação</p>
          </div>
        </div>

        <div class="summary">
          <div class="summary__item">
            <span> Valor investido </span>

            <strong>
              {{ formatCurrency(initialValue) }}
            </strong>
          </div>

          <div class="summary__item">
            <span> Prazo </span>
            <strong> {{ years }} anos </strong>
          </div>

          <div class="summary__item">
            <span> Taxa anual </span>
            <strong> {{ anualProfitability }}% </strong>
          </div>

          <div class="summary__item summary__item--result">
            <span> Valor estimado </span>

            <strong>
              {{ formatCurrency(finalValue) }}
            </strong>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
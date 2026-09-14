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

const formatCompactCurrency = (value: number) => {
  if (value >= 1e9) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 2
    }).format(value);
  }
  return formatCurrency(value);
};

const chartData = computed(() => {
  if (
    initialValue.value === null ||
    anualProfitability.value === null ||
    years.value === null
  ) {
    return []
  }

  return Array.from({ length: years.value }, (_, index) => {
    const year = index + 1

    const value = initialValue.value * Math.pow(
      1 + anualProfitability.value / 100,
      year
    )

    return {
      year,
      value
    }
  })
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

      <NuxtLink to="/simulator" class="dashboard__back"> Nova simulação</NuxtLink>
    </header>

    <section class="dashboard__cards">
      <div class="card">
        <span class="card__label"> Investimento inicial </span>
        <strong class="card__value" :title="formatCurrency(initialValue ?? 0)">
          {{ formatCompactCurrency(initialValue ?? 0) }}
        </strong>
      </div>

      <div class="card">
        <span class="card__label"> Rentabilidade anual </span>
        <strong class="card__value"> {{ anualProfitability }}% </strong>
      </div>

      <div class="card">
        <span class="card__label"> Rendimento </span>
        <strong class="card__value card__value--profit" :title="formatCurrency(profit)">
          {{ formatCompactCurrency(profit) }}
        </strong>
      </div>

      <div class="card card--highlight">
        <span class="card__label"> Patrimônio final </span>
        <strong class="card__value" :title="formatCurrency(finalValue)">
          {{ formatCompactCurrency(finalValue) }}
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

        <!-- Container do gráfico com barra de rolagem quando houver muitos anos -->
        <div class="chart-scroll-wrapper">
          <div class="chart">
            <div v-for="item in chartData" :key="item.year" class="chart__item">
              <div class="chart__bar-container">
                <div class="chart__bar" :style="{height: finalValue > 0 ? `${Math.max((item.value / finalValue) * 100, 2)}%` : '0%'}"></div>
              </div>

              <strong :title="formatCurrency(item.value)">
                {{ formatCompactCurrency(item.value) }}
              </strong>

              <span> Ano {{ item.year }} </span>
            </div>
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
            <strong :title="formatCurrency(initialValue ?? 0)">
              {{ formatCompactCurrency(initialValue ?? 0) }}
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

          <div class="summary__item summary__item--highlight">
            <span> Valor estimado </span>
            <strong :title="formatCurrency(finalValue)">
              {{ formatCompactCurrency(finalValue) }}
            </strong>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <Footer/>
  </footer>
</template>
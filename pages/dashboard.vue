<script setup lang="ts">
import "./dashboard.scss";
import GrowthChart from "../components/dashboard/GrowthChart.vue";
import { computed } from "vue";
import ComparisonTable from "~/components/comparison/ComparisonTable.vue";

const {
  initialValue,
  monthlyValue,
  anualProfitability,
  years,
  interestType,
  finalValue,
  profit
} = useSimulator();

const {
  comparisonSummary,
  removeScenario,
  duplicateScenario
} = useComparison();

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

const simulacaoTimeline = computed(() => {
  const p = initialValue.value ?? 0;
  const pMensal = monthlyValue ? (monthlyValue.value ?? 0) : 0;
  const taxaAnual = anualProfitability.value ?? 0;
  const totalAnos = years.value ?? 0;

  if (p === 0 || totalAnos === 0) return [];

  const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  const totalMeses = totalAnos * 12;

  let montante = p;
  let investido = p;

  const dados = [];

  for (let mes = 1; mes <= totalMeses; mes++) {
    if (interestType.value === "simple") {
      investido += pMensal;
      montante = p + (p * (taxaAnual / 100) * (mes / 12)) + (investido - p);
    } else {
      montante = (montante + pMensal) * (1 + taxaMensal);
      investido += pMensal;
    }

    dados.push({
      periodo: mes,
      totalInvestido: Number(investido.toFixed(2)),
      totalAcumulado: Number(montante.toFixed(2))
    });
  }

  return dados;
});
</script>

<template>
  <main class="dashboard">
    <header class="dashboard__header">
      <div>
        <span class="dashboard__tag">Dashboard</span>
        <h1>Seus investimentos</h1>
        <p>Acompanhe a evolução da sua simulação</p>
      </div>

      <NuxtLink to="/simulator" class="dashboard__back">Nova simulação</NuxtLink>
    </header>

    <section class="dashboard__cards">
      <div class="card">
        <span class="card__label">Investimento inicial</span>
        <strong class="card__value" :title="formatCurrency(initialValue ?? 0)">
          {{ formatCompactCurrency(initialValue ?? 0) }}
        </strong>
      </div>

      <div class="card">
        <span class="card__label">Rentabilidade anual</span>
        <strong class="card__value">{{ anualProfitability }}%</strong>
      </div>

      <div class="card">
        <span class="card__label">Rendimento</span>
        <strong class="card__value card__value--profit" :title="formatCurrency(profit)">
          {{ formatCompactCurrency(profit) }}
        </strong>
      </div>

      <div class="card card--highlight">
        <span class="card__label">Patrimônio final</span>
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
            <p>Projeção para {{ years }} anos ({{ interestType === "simple" ? "Juros simples" : "Juros compostos" }})</p>
          </div>
        </div>

        <div class="panel__chart">
          <GrowthChart :timeline-data="simulacaoTimeline" />
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
            <span>Tipo de juros</span>
            <strong>{{ interestType === "simple" ? "Simples" : "Compostos" }}</strong>
          </div>

          <div class="summary__item">
            <span>Valor investido</span>
            <strong :title="formatCurrency(initialValue ?? 0)">
              {{ formatCompactCurrency(initialValue ?? 0) }}
            </strong>
          </div>

          <div class="summary__item">
            <span>Prazo</span>
            <strong>{{ years }} anos</strong>
          </div>

          <div class="summary__item">
            <span>Taxa anual</span>
            <strong>{{ anualProfitability }}%</strong>
          </div>

          <div class="summary__item summary__item--highlight">
            <span>Valor estimado</span>
            <strong :title="formatCurrency(finalValue)">
              {{ formatCompactCurrency(finalValue) }}
            </strong>
          </div>
        </div>
      </div>
    </section>

    <section class="dashboard__comparison" v-if="comparisonSummary">
      <div class="panel">
        <div class="panel__header">
          <div>
            <h2>Comparativo de Cenários</h2>
            <p>Análise lado a lado das suas simulações</p>
          </div>
        </div>

        <ComparisonTable :summary="comparisonSummary" @remove="removeScenario" @duplicate="duplicateScenario"/>
      </div>
    </section>
  </main>

  <footer>
    <Footer />
  </footer>
</template>
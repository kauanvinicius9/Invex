<script setup lang="ts">
import "./dashboard.scss";
import GrowthChart from "../components/dashboard/GrowthChart.vue";
import ComparisonTable from "~/components/comparison/ComparisonTable.vue";
import { computed } from "vue";

const { initialValue, monthlyValue, anualProfitability, years, interestType, finalValue, profit } = useSimulator();
const { comparisonSummary, removeScenario, duplicateScenario } = useComparison();

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

const simulationTimeline = computed(() => {
  const p = initialValue.value ?? 0;
  const pMonthly = monthlyValue ? (monthlyValue.value ?? 0) : 0;
  const anualFee = anualProfitability.value ?? 0;
  const totalYears = years.value ?? 0;

  if (p === 0 || totalYears === 0) return [];

  const monthlyFee = Math.pow(1 + anualFee / 100, 1 / 12) - 1;
  const totalMonth = totalYears * 12;

  let amount = p;
  let invested = p;

  const data = [];

  for (let month = 1; month <= totalMonth; month++) {
    if (interestType.value === "simple") {
      invested += pMonthly;
      amount = p + (p * (anualFee / 100) * (month / 12)) + (invested - p);

    } else {
      amount = (amount + pMonthly) * (1 + monthlyFee);
      invested += pMonthly;
    }

    data.push({ period: month, totalInvested: Number(invested.toFixed(2)), totalAccumulated: Number(amount.toFixed(2)) });
  }

  return data;
});

// Exportação relatório em excel
const exportToExcel = async () => {
  if (!simulationTimeline.value.length) return;

  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS. Workbook();

  const summarySheet = workbook.addWorksheet("Resumo");
  summarySheet.columns = [
    { header: "Métrica", key: "metric", width: 25 },
    { header: "Valor", key: "value", width: 22 },
  ];

  summarySheet.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };
  summarySheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1E3A8A" } };

  summarySheet.addRows([
    { metric: "Investimento Inicial", value: initialValue.value ?? 0 },
    { metric: "Aporte Mensal", value: monthlyValue?.value ?? 0 },
    { metric: "Taxa Anual", value: `${anualProfitability.value ?? 0}%` },
    { metric: "Prazo", value: `${years.value ?? 0} anos` },
    { metric: "Tipo de Juros", value: interestType.value === "simple" ? "Simples" : "Compostos" },
    { metric: "Rendimento Total", value: profit.value ?? 0 },
    { metric: "Patrimônio Final", value: finalValue.value ?? 0 },
  ]);

  [2, 3, 7, 8].forEach((rowIndex) => {
    summarySheet.getRow(rowIndex).getCell(2).numFmt = "R$ #,##0.00";
  });

  const timelineSheet = workbook.addWorksheet("Evolução Mensal");
  timelineSheet.columns = [
    { header: "Mês", key: "period", width: 10},
    { header: "Total Investido", key: "totalInvested", width: 20},
    { header: "Saldo Acumulado", key: "totalAccumulated", width: 22},
    { header: "Rendimento do Mês", key: "interest", width: 22},
  ];

  timelineSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFF" } };
  timelineSheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1E3A8A"} };

  simulationTimeline.value.forEach((item) => {
    const row = timelineSheet.addRow({ period: item.period, totalInvested: item.totalInvested, totalAccumulated: 
                                                                        item.totalAccumulated, interest: Number((item.totalAccumulated - item.totalInvested).toFixed(2)) });

    row.getCell(2).numFmt = "R$ #,##0.00";
    row.getCell(3).numFmt = "R$ #,##0.00";
    row.getCell(4).numFmt = "R$ #,##0.00";
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = `Invex_Simulacao_${new Date().toISOString().slice(0, 10)}.xlsx`;
  link.click();

  setTimeout(() =>URL.revokeObjectURL(link.href), 100);
};
</script>

<template>
  <main class="dashboard">
    <header class="dashboard__header">
      <div>
        <span class="dashboard__tag">Dashboard</span>
        <h1>Seus investimentos</h1>
        <p>Acompanhe a evolução da sua simulação</p>
      </div>

      <div class="dashboard__actions">
        <button @click="exportToExcel" class="dashboard__export-btn" title="Exportar dados para Excel .xlsx">
          Exportar dados
        </button>
        <NuxtLink to="/simulator" class="dashboard__back">Nova simulação</NuxtLink>
      </div>
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
        <strong class="card__value">
          {{ anualProfitability ?? 0  }}%
        </strong>
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
            <p>Projeção para {{ years ?? 0 }} anos ({{ interestType === "simple" ? "Juros simples" : "Juros compostos" }})</p>
          </div>
        </div>

        <div class="panel__chart">
          <GrowthChart :timeline-data="simulationTimeline" />
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
            <strong>{{ anualProfitability ?? 0  }}%</strong>
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
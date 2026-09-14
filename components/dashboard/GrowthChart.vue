<script setup lang="ts">
import { computed } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, Filler } from "chart.js";
import { Line } from "vue-chartjs";
import type { ScenarioResult } from "~/types/simulator";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Filler
);

interface SimpleTimelinePoint {
  periodo: number | string;
  totalInvestido: number;
  totalAcumulado: number;
}

const props = defineProps<{
  results?: ScenarioResult[];
  timelineData?: SimpleTimelinePoint[];
}>();

const COLOR_PALETTE = [
  { border: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
  { border: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  { border: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" },
  { border: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
  { border: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" }
];

const chartData = computed(() => {
  if (props.results && props.results.length > 0) {
    const maxMonths = Math.max(...props.results.map((r) => r.timeline.length));
    const labels = Array.from({ length: maxMonths }, (_, i) => `Mês ${i + 1}`);

    const datasets = props.results.map((res, index) => {
      const color = COLOR_PALETTE[index % COLOR_PALETTE.length];
      return {
        label: res.input.name,
        data: res.timeline.map((t) => t.totalAcumulado),
        borderColor: color.border,
        backgroundColor: color.bg,
        fill: false,
        tension: 0.3,
        pointRadius: 2
      };
    });

    return { labels, datasets };
  }

  if (props.timelineData && props.timelineData.length > 0) {
    const labels = props.timelineData.map((d) => `Mês ${d.periodo}`);
    const investido = props.timelineData.map((d) => d.totalInvestido);
    const acumulado = props.timelineData.map((d) => d.totalAcumulado);

    return {
      labels,
      datasets: [
        {
          label: "Valor Total (com Juros)",
          data: acumulado,
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 2
        },
        {
          label: "Total Investido",
          data: investido,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.05)",
          fill: true,
          tension: 0.3,
          pointRadius: 2
        }
      ]
    };
  }

  return { labels: [], datasets: [] };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: { font: { family: "Inter, sans-serif", size: 12 } }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.raw || 0;
          return `${context.dataset.label}: ${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(value)}`;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value: any) =>
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0
          }).format(value)
      }
    }
  }
};
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
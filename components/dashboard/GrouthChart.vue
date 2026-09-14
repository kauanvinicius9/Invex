<!-- components/dashboard/GrowthChart.vue -->
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

const props = defineProps<{
  results: ScenarioResult[];
}>();


const COLOR_PALETTE = [
  { border: "#10B981", bg: "rgba(16, 185, 129, 0.1)" }, 
  { border: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" }, 
  { border: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" }, 
  { border: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" }, 
  { border: "#EF4444", bg: "rgba(239, 68, 68, 0.1)" }
];

const chartData = computed(() => {
  if (!props.results || props.results.length === 0) {
    return { labels: [], datasets: [] };
  }

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
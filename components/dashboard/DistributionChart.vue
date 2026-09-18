<script setup lang="ts">
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, type ChartData, type ChartOptions } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const props = defineProps<{
    totalInvested: number;
    totalProfit: number;
}>();

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL"}).format(val);
};

const chartData = computed<ChartData<"pie">>(() => ({
    labels: ["Total Investido", "Rendimentos"],
    datasets: [
        {
            data: [props.totalInvested, props.totalProfit],
            backgroundColor: ["#1e293b", "#099e09"],
            hoverBackgroundColor: ["#334155", "#008000"],
            borderWidth: 2,
            borderColor: "#ffffff",
        },
    ],
}));

const chartOptions = computed<ChartOptions<"pie">>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                font: { family: "Inter, sans-serif", size: 12 },
                color: "#64748b",
                usePointStyle: true,
                padding: 16,
            },
        },

        tooltip: {
            callbacks: {
                label: (context) => {
                    const rawValue = context.raw as number;
                    return `${context.label}: ${formatCurrency(rawValue)}`;
                },
            },
        },
    },
}));
</script>

<template>
    <div class="pie-chart-container">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>
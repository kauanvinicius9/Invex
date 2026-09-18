<script setup lang="ts">
import "./ComparisonTable.scss";
import type { ComparisonSummary } from "~/types/simulator";

const props = defineProps<{
    summary: ComparisonSummary | null;
}>();

const emit = defineEmits<{
    duplicate: [íd: string];
    remove: [id: string];
}>();

const formatCurrency = (val: number | null  | undefined) => {
  if (val === null || val === undefined || isNaN(val)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(val);
};
</script>

<template>
  <div v-if="summary && summary.results.length > 0" class="comparison-table">
    <div v-if="summary.bestScenarioId" class="comparison-table__banner">
      <span>O melhor cenário rende <strong>{{ formatCurrency(summary.profitDifference) }}</strong> a mais que o segundo colocado</span>
    </div>

    <div class="comparison-table__scroll">
      <table class="table">
        <thead class="table__head">
          <tr class="table__row">
            <th class="table__header">Cenário</th>
            <th class="table__header">Aporte Inicial</th>
            <th class="table__header">Aporte Mensal</th>
            <th class="table__header">Taxa / Prazo</th>
            <th class="table__header">Total Investido</th>
            <th class="table__header">Rendimento</th>
            <th class="table__header">Valor Final</th>
            <th class="table__header">Ações</th>
          </tr>
        </thead>
        
        <tbody class="table__body">
          <tr v-for="res in summary.results" :key="res.input.id" class="table__row" :class="{ 'table__row--winner': res.input.id === summary.bestScenarioId }">
            <td class="table__cell table__cell--title">
              <div class="table__scenario-info">
                <span>{{ res.input.name }}</span>
                <span v-if="res.input.id === summary.bestScenarioId" class="badge badge--winner">Melhor</span>
              </div>
            </td>

            <td class="table__cell">{{ formatCurrency(res.input.initialValue) }}</td>
            <td class="table__cell">{{ formatCurrency(res.input.monthlyValue) }}/mês</td>
            <td class="table__cell">{{ res.input.anualProfitability }}% a.a. ({{ res.input.years }} anos)</td>
            <td class="table__cell">{{ formatCurrency(res.totalInvested) }}</td>
            <td class="table__cell table__cell--profit">+{{ formatCurrency(res.totalProfit) }} ({{ res.profitPercentage }}%)</td>
            <td class="table__cell table__cell--final">{{ formatCurrency(res.finalValue) }}</td>

            <td class="table__cell">
              <div class="table__actions">
                <button title="Duplicar" @click="emit('duplicate', res.input.id)" class="btn-icon">Atualizar</button>
                <button title="Excluir" @click="emit('remove', res.input.id)" class="btn-icon btn-icon--danger">Deletar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
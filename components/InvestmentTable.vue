<script setup lang="ts">
import type { InvestmentResult } from "../types/investments";
import { computed } from "vue";
import "./InvestmentTable.scss";

const props = defineProps<{
  result: InvestmentResult
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)
}

const rows = computed(() => {
  if (!props.result) return []

  return Array.from({ length: props.result.years + 1}, (_, year) => {
    const value = props.result.initialValue * Math.pow(1 + props.result.anualProfitability / 100, year)
    return {
      year,
      value,
      profit: value - props.result.initialValue
    }
  })
})
</script>

<template>
  <div class="investment-table">
    <Sidebar />
    <div class="investment-table__header">
      <div>
        <h2>Projeção do investimento</h2>

        <p>
          Veja como o seu patrimônio pode evoluir ao longo dos anos
        </p>
      </div>
    </div>

    <div class="investment-table__wrapper">
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Patrimônio</th>
            <th>Rendimento acumulado</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows" :key="row.year" :class="{ 'is-final': row.year === props.result.years }">
            <td>
              {{ row.year === 0 ? "Inicial" : `${row.year}º ano` }}
            </td>
            
            <td>
              {{ formatCurrency(row.value) }}
            </td>
            
            <td>
              {{ formatCurrency(row.profit) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

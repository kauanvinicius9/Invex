<script setup lang="ts">
import type { InvestmentResult } from "../types/investments"

defineProps<{
  result: InvestmentResult
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value)
}
</script>

<template>
  <div class="result-card">
    <div class="result-card__header">
      <span>Resultado</span>

      <h2>Seu investimento</h2>

      <p>
        Confira a estimativa do seu investimento ao longo do tempo
      </p>
    </div>

    <div class="result-card__main">
      <span>Patrimônio final</span>

      <strong>
        {{ formatCurrency(result.finalValue) }}
      </strong>
    </div>

    <div class="result-card__details">
      <div class="result-card__item">
        <span>Valor inicial</span>

        <strong>
          {{ formatCurrency(result.initialValue) }}
        </strong>
      </div>

      <div class="result-card__item">
        <span>Rendimento</span>

        <strong>
          {{ formatCurrency(result.profit) }}
        </strong>
      </div>
      
      <div class="result-card__item">
        <span>Rentabilidade</span>

        <strong>
          {{ result.anualProfitability }}% ao ano
        </strong>
      </div>
      
      <div class="result-card__item">
        <span>Período</span>

        <strong>
          {{ result.years }} anos
        </strong>
      </div>
    </div>
  </div>
</template>

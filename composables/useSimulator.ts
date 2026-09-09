import { computed, ref } from "vue";
import type { Investment } from "../types/investments";
import { calculateInvestment } from "../utils/calculations";

export function useSimulator() {
  const initialValue = ref(12000)
  const anualProfitability = ref(10)
  const years = ref(5)

  const investment = computed<Investment>(() => ({
    initialValue: initialValue.value,
    anualProfitability: anualProfitability.value,
    years: years.value
  }))

  const result = computed(() => {
    return calculateInvestment(investment.value)
  })

  const finalValue = computed(() => result.value.finalValue)
  const profit = computed(() => result.value.profit)

  return {
    initialValue,
    anualProfitability,
    years,
    investment,
    result,
    finalValue,
    profit
  }
}

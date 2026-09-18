import type { Investment } from "../types/investments";
import { calculateInvestment } from "../utils/calculations";
import { computed } from "vue";

export type InterestType = "compound" | "simple";

export function useSimulator() {
  const initialValue = useState<number | null>("initialValue", () => null);
  const monthlyValue = useState<number | null>("monthlyValue", () => null);
  const anualProfitability = useState<number | null>("anualProfitability", () => null);
  const years = useState<number | null>("years", () => null);
  const interestType = useState<InterestType>("interestType", () => "compound");

  const investment = computed<Investment | null>(() => {
    if (
      initialValue.value === null ||
      anualProfitability.value === null ||
      years.value === null
    ) {
      return null;
    }

    return { initialValue: initialValue.value, monthlyValue: monthlyValue.value ?? 0, anualProfitability: 
                  anualProfitability.value, years: years.value, interestType: interestType.value };
  });

  const result = computed(() => {
    if (!investment.value) return null;
      return calculateInvestment(investment.value);
  });

  const finalValue = computed(() => {
    if (!investment.value) return 0;

    if (result.value && typeof result.value === "object" && "finalvalue" in result.value) {
      return result.value.finalValue;
    }

    const P = initialValue.value ?? 0;
    const PMT = monthlyValue.value ?? 0;
    const anualRate = (anualProfitability.value ?? 0) / 100;
    const totalMonths = (years.value ?? 0) * 12;

    if (totalMonths === 0) return P;

    if (interestType.value === "simple") {
      const initialInterest = P * anualRate * (years.value ?? 0);
      const totalPMT = PMT * totalMonths;
      const pmtInterest = PMT * (anualRate / 12) * ((totalMonths * (totalMonths + 1)) / 2);

      return P + initialInterest + totalPMT + pmtInterest;
    }

    const i = Math.pow(1 + anualRate, 1 / 12) - 1;
    const compoundInitial = P * Math.pow(1 + i, totalMonths);
    const compoundPMT = i > 0 ? PMT * ((Math.pow(1 + i, totalMonths) - 1) / 1) : PMT * totalMonths;
    const total = compoundInitial + compoundPMT;

    return Number.isFinite(total) ? Number(total.toFixed(2)) : 0;
  });

  const profit = computed(() => {
    if (initialValue.value === null || finalValue.value === 0) {
      return 0;
    }

    const totalInvested = (initialValue.value ?? 0) + ((monthlyValue.value ?? 0) * (years.value ?? 0) * 12);
    return Math.max(0, finalValue.value - totalInvested);
  });

  return { initialValue, monthlyValue, anualProfitability, years, interestType, investment, result, finalValue, profit };
}
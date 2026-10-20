## Technical Documentation: Invex

**Invex** is a high-performance web application developed for managing, simulating and comparing financial investments. Built with **Nuxt 3**, **Vue 3**, **TypeScript** and **SCSS**, the platform offers a reactive and intuitive interface for graphical portfolio analysis, compound interest simulation and equity projections.

---

## Overview and Features

The **Invex** platform was designed to serve investors and analysts who seek to simulate financial scenarios and visualize the distribution of their assets in real time.

### Key Features:

- **Input Simulations:** Projection of asset growth with configurable compound interest rate and recurring contributions.
- **Dynamic Charts:** Real-time visualization of the distribution by asset classes and equity evolution.
- **Asset Comparison:** Comparative table to evaluate returns between different types of investment (Fixed Income, Shares, FIIs, etc.).
- **Modular Architecture:** Clear separation between visual layer (Components/Pages), states and actions (`composables`), and calculation engines (`utils`).

---

## Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Web Framework** | [Nuxt 3](https://nuxt.com/) | Meta-framework for Vue 3 focused on performance, SSR and file-based routes. |
| **UI Library** | [Vue 3](https://vuejs.org/) | Reactivity with the Composition API (`<script setup lang="ts">`). |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | End-to-end static typing to ensure data robustness and predictability. |
| **Styling** | [SCSS (Sass)](https://sass-lang.com/) | CSS preprocessor with organized variables and style modularization. |
| **Unit Tests** | [Vitest](https://vitest.dev/) | Fast, native test runner for Vite-based ecosystems. |

---

- **Decoupling:** No financial calculation rules are executed directly within the visual components.
- **Testability:** The calculation functions inside `utils/` are pure, making it easy to cover unit tests with Vitest.

---

## Main Modules and Features

### Financial Dashboard (`/dashboard`)

Offers a panoramic view of the distribution and growth of accumulated assets:
- **DistributionChart:** Displays the percentage proportion of the portfolio by category (Ex: 40% Fixed Income, 30% Stocks, 30% FIIs).
- **GrowthChart:** Plots the evolution line over the months/years, comparing the amount invested *versus* the amount earned in interest.

### Investment Simulator (`/simulator`)

Interactive interface of dynamic inputs to project the financial future:
- **Inputs:** Initial Contribution ($R\$$), Monthly Contribution ($R\$$), Annual/Monthly Interest Rate ($\%$) and Period ($Months/Years$).
- **Results:** Total Invested, Total Interest, estimated Gross and Net Equity.

### Asset Comparator (`/comparison`)

Allows you to place two or more securities side by side to identify the best opportunity based on terms, liquidity and taxation.

---

## Composables and Business Logic

Composables manage the reactive state of pages and expose helper functions to manipulate form and graph data.

### `useSimulator.ts`
Manages the data provided by the user in the simulation form and automatically recalculates deadlines and projections.

```typescript
// Example of simplified interface
export const useSimulator = () => {
  const params = ref<SimulatorParams>({
    initialAmount: 1000,
    monthlyContribution: 200,
    interestRate: 10, // % per year
    periodMonths: 12
  });

  const results = computed(() => calculateCompoundInterest(params.value));

  return { params, results };
};
```

### `useComparison.ts`

Controls asset selection for the comparison table, allowing you to add, remove, or change security rates in real time.

---

## Utilities and Algorithms (Utils)

Located in `utils/`, these files contain pure math functions with no Vue/Nuxt dependencies.

## Configuration and Installation

### Prerequisites

- **Node.js:** `^18.x` or `^20.x`
- **npm** or **yarn** / **pnpm**

### Step by Step

1. **Clone the repository and access the folder:**
   
   ```bash
   cd Invex-main
   ```

3. **Install dependencies:**
   
   ```bash
   npm install
   ```

5. **Start development server:**
   
   ```bash
   npm run dev
   ```
   
   The application will be accessible at `http://localhost:3000`.

7. **Generate the Build for Production:**
   
   ```bash
   npm run build
   ```

9. **Run the Production Build:**
    
   ```bash
   npm run preview
   ```

---

## Unit Tests

The project has **Vitest** configured for continuous validation of financial calculations and composables.

To run the automated tests:

```bash
# Run the test suite in watch mode
npm run test

# Run the tests once (CI/CD)
npm run test:run
```

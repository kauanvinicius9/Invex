## Invex - Simulate your Investiments

Invex is a **Front-End** project developed with `Vue` + `Nuxt`. Its purpose is to simulate real-world investments, allowing you to enter any amount less than or equal to **BRL 10,000.00**, select an annual profitability of up to **100%**, and set a timeframe of up to **100 years**. The results calculate accurate figures using compound interest or simple interest, you can select which one to use, featuring a **dynamic dashboard** and a table that displays the growth of your money over the selected years. With Invex, you can not only run simulations but also **organize your money** simply and securely.

---

- **Flexible Interest Calculations:** Switch seamlessly between **Compound Interest** and **Simple Interest** models, backed by precise business logic;
- **Interactive Growth Dashboard:** Dynamic multi-line chart powered by `Chart.js` and `vue-chartjs`, visualizing timeline growth, total contributions, and interest accumulated over time with instant currency formatting (`BRL`);
- **Scenario Comparison Tool:** Compare multiple investment strategies side-by-side in a comparative table with automatic highlighting for top-performing scenarios and delta profit calculations;
- **Reactive State Management:** Global state synchronization across inputs, dashboards, and comparison tools using Nuxt's `useState` composables.

---

```powershell
npm install chart.js vue-chart.js
```

<div align="left">
  <img src="https://skillicons.dev/icons?i=vue" height="65" alt="vuejs logo" title="Vue" />
  <img src="https://skillicons.dev/icons?i=nuxtjs" height="65" alt="nuxtjs logo" title="Nuxt" />
  <img src="https://skillicons.dev/icons?i=sass" height="65" alt="sass logo" title="SCSS" />
  <img src="https://skillicons.dev/icons?i=ts" height="65" alt="typescript logo" title="TypeScript" />
  <img src="https://skillicons.dev/icons?i=vitest" height="65" alt="vitest logo" title="Vitest" />
</div>

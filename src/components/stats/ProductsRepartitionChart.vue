<template>
  <div class="box">
    <div class="box-title"><span class="title">Ventes par produits</span></div>
    <Chart chart="donut" class="box-content" :series="Object.values(productsChartData)" :labels="Object.keys(productsChartData)" :show-legend="false"/>
  </div>
</template>

<script>
import Chart from '../Chart'

export default {
  name: 'ProductsRepartitionChart',
  components: { Chart },
  computed: {
    productsChartData () {
      const commands = this.getCommands
      const productSells = {}
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i]
        if (command && command.basket && command.basket.entries) {
          const entries = command.basket.entries
          for (let j = 0; j < entries.length; j++) {
            const entry = entries[j]
            const product = this.getProduct(entry.product_id)
            if (!productSells[product.name]) productSells[product.name] = 0
            productSells[product.name]++
          }
        }
      }
      return productSells
    }
  }
}
</script>

<template>
  <div id="products-stats">
    <div class="row">
      <ProductsRepartitionChart class="w-s6"/>
    </div>
  </div>
</template>

<script>
import ProductsRepartitionChart from '../../components/stats/ProductsRepartitionChart'
import store from '../../store'

export default {
  name: 'ProductsStats',
  components: { ProductsRepartitionChart },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands').finally(() => {
      store.dispatch('fetchProducts').finally(() => {
        next()
      })
    })
  }
}
</script>

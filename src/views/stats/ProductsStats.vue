<template>
  <div id="products-stats">
    <div class="row">
      <TotalProductSells class="col-12 col-lg-4"/>
      <AverageProductsByBasket class="col-12 col-lg-4"/>
      <AverageProductsByBasket class="col-12 col-lg-4" :distinct="true"/>
    </div>
    <div class="row">
      <ProductSalesChart class="col-12 col-lg-6"/>
      <ProductsRepartitionChart class="col-12 col-lg-6"/>
    </div>
  </div>
</template>

<script>
import ProductsRepartitionChart from '../../components/stats/ProductsRepartitionChart'
import store from '../../store'
import ProductSalesChart from '../../components/stats/ProductSalesChart'
import TotalProductSells from '../../components/stats/TotalProductSells'
import AverageProductsByBasket from '../../components/stats/AverageProductsByBasket'

export default {
  name: 'ProductsStats',
  components: { AverageProductsByBasket, TotalProductSells, ProductSalesChart, ProductsRepartitionChart },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands').finally(() => {
      store.dispatch('fetchProducts').finally(() => {
        next()
      })
    })
  }
}
</script>

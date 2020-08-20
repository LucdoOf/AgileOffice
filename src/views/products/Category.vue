<template>
  <div id="category">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row">
          <EditCategory class="col-12 wr" :category="category"/>
        </div>
        <div class="row">
          <CategoryProductTable class="col-12 wr" :category="category"/>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <CategoryCommandsChart class="col-12 wr" :category="category"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import EditCategory from '../../components/products/EditCategory'
import CategoryProductTable from '../../components/products/CategoryProductsTable'
import CategoryCommandsChart from '../../components/products/CategoryCommandsChart'

export default {
  name: 'Category',
  components: { CategoryCommandsChart, CategoryProductTable, EditCategory },
  props: ['id'],
  computed: {
    category () {
      return this.$store.getters.getCategory(this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCategories').then(() => {
      store.dispatch('fetchProducts').then(() => {
        store.dispatch('fetchBasketEntries').then(() => {
          next()
        })
      })
    })
  }
}
</script>

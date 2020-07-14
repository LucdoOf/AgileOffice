<template>
  <div id="category">
    <div class="row">
      <div class="w-s6">
        <div class="row">
          <EditCategory class="w-s12 wr" :category="category"/>
        </div>
        <div class="row">
          <CategoryProductTable class="w-s12 wr" :category="category"/>
        </div>
      </div>
      <div class="w-s6">
        <CategoryCommandsChart class="w12" :category="category"/>
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

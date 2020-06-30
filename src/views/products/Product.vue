<template>
  <div id="product">
    <div class="row">
      <div class="w-s6">
        <EditProduct :product="this.product" ref="editProduct"/>
      </div>
      <div class="w-s6">
        <ProductCommandsChart :product="this.product" :height="chartHeight"/>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import EditProduct from '../../components/products/EditProduct'
import store from '../../store/index'
import ProductCommandsChart from '../../components/products/ProductCommandsChart'

export default {
  name: 'Product',
  components: { ProductCommandsChart, EditProduct },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  computed: {
    product () {
      return this.$store.getters.getProduct(this.id)
    }
  },
  props: ['id'],
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchProducts').finally(() => {
      store.dispatch('fetchCommands').finally(() => {
        store.dispatch('fetchBasketEntries').finally(() => {
          store.dispatch('fetchCategories').finally(() => {
            next()
          })
        })
      })
    })
  },
  data () {
    return {
      chartHeight: '450px'
    }
  },
  mounted () {
    this.chartHeight = (this.$refs.editProduct.$el.clientHeight - 120) + 'px'
  }
}
</script>

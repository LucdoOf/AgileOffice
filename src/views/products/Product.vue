<template>
  <div id="product">
    <div class="row">
      <div class="col-12 col-lg-6">
        <EditProduct :product="this.product" ref="editProduct"/>
      </div>
      <div class="col-12 col-lg-6">
        <ProductCommandsChart :product="this.product" :height="chartHeight"/>
      </div>
    </div>
    <div class="row">
      <ProductMedias class="col-12 col-lg-6" :product="this.product"/>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import EditProduct from '../../components/products/EditProduct'
import store from '../../store/index'
import ProductCommandsChart from '../../components/products/ProductCommandsChart'
import ProductMedias from '../../components/products/ProductMedias'

export default {
  name: 'Product',
  components: { ProductMedias, ProductCommandsChart, EditProduct },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  computed: {
    product () {
      return this.$store.getters.getActualProduct
    }
  },
  props: ['id'],
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchProduct', to.params).finally(() => {
      store.dispatch('fetchProductCommands', to.params).finally(() => {
        store.dispatch('fetchCategories').finally(() => {
          next()
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

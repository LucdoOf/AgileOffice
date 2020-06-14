<template>
  <div id="product-commands">
    <div class="row">
      <div class="box w-s12">
        <div class="box-title"><span class="title">Commandes du produit "{{ product.name }}"</span></div>
      </div>
    </div>
    <div class="row">
      <ProductCommandsTable :product="product" class="w-s12"/>
    </div>
  </div>
</template>

<script>

import store from '../../store'
import ProductCommandsTable from '../../components/products/ProductCommandsTable'

export default {
  components: { ProductCommandsTable },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchProducts').finally(() => {
      next()
    })
  },
  computed: {
    product () {
      return this.$store.getters.getProduct(this.id)
    }
  },
  props: ['id']
}
</script>

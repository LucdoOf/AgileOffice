<template>
  <div id="products">
    <div class="row">
      <div class="box w-s12">
        <div class="box-title">
          <span class="title">Produits</span>
          <div class="box-actions">
            <a class="link" @click="this.addProduct"><i class="fas fa-plus r clickable"/>Ajouter un produit</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
        <Table class="w-s12" v-bind:columns="{'reference':'Référence','name':'Nom','stock':'Stock restant','price':'Prix','category_name':'Catégorie'}"
               v-bind:table-data="this.getFormatedProducts()"
               @row-click="(row) => this.$router.push({ name: 'product', params: { id: row.id } })"/>
      </div>
  </div>
</template>

<script>

import Table from '../../components/Table'
import { mapActions } from 'vuex'
import AddProductModal from '../../components/modals/AddProductModal'

export default {
  name: 'Products',
  components: { Table },
  methods: {
    ...mapActions(['fetchProducts']),
    addProduct () {
      this.$modal.show(AddProductModal)
    },
    getFormatedProducts () {
      const products = this.getProducts
      const toReturn = []
      for (let i = 0; i < products.length; i++) {
        const clone = Object.assign({}, products[i])
        if (clone) {
          clone.stock = parseInt(clone.stock)
          clone.price = this.$app.parseDecimal(clone.price) + ' €'
          clone.category_name = clone.category ? clone.category.name + ' (' + clone.category.slug + ')' : '&mdash;'
          clone.category_name_value = clone.category ? clone.category.slug : '&mdash;'
          toReturn.push(clone)
        }
      }
      return toReturn
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<template>
  <div class="box no-padding">
    <div class="box-title"><span class="title">Produits liés</span></div>
    <div class="box-content">
      <Table :columns="{'reference':'Référence', 'name':'Nom', 'stock': 'Stock restant', 'price': 'Prix'}"
             :table-data="tableData"
             @row-click="(row) => this.$router.push({ name: 'product', params: { id: row.id } })"/>
    </div>
  </div>
</template>

<script>
import Table from '../Table'

export default {
  name: 'CategoryProductsTable',
  components: { Table },
  props: ['category'],
  computed: {
    tableData () {
      return this.getCategoryLinkedProducts(this.category.id)
    }
  }
}
</script>

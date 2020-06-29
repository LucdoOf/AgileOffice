<template>
  <div class="box no-padding">
    <div class="box-title">
      <span class="title">Panier</span>
      <div class="box-actions">
        <a class="link" @click="this.showModal"><i class="fas fa-plus r"/>Ajouter une entrée panier</a>
      </div>
    </div>
    <div class="box-content">
      <Table @row-click='this.rowClick' :table-data="entries" :columns="{'product_name':'Produit','quantity':'Quantité','entry_discount':'Réduction (%)','price':'Prix total TTC'}"/>
    </div>
    <div class="box-footer">
      <div class="field">
        <div class="label">Montant du panier TTC</div>
        <div class="value xl">{{ this.$app.parseDecimal(this.entries.reduce((total, entry) => total + parseFloat(entry.price), 0)) }} €</div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../Table'
import AddBasketEntryModal from '../modals/AddBasketEntryModal'

export default {
  name: 'BasketEditor',
  components: { Table },
  data () {
    return {
      entries: []
    }
  },
  methods: {
    showModal () {
      this.$modal.show(AddBasketEntryModal, { entries: this.entries })
    },
    rowClick (row) {
      this.entries.splice(this.entries.indexOf(row), 1)
    }
  }
}
</script>

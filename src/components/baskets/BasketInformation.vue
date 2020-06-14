<template>
  <div class="box no-padding">
    <div class="box-title">
      <span class="title"><slot>Articles</slot> (#{{ this.basket.id }})</span>
    </div>
    <div class="box-content">
      <Table
        :table-data="this.getFormatedEntries()"
        :columns="{
          'product_name': 'Produit',
          'quantity': 'Quantité',
          'product_price': 'Prix unitaire TTC',
          'entry_price': 'Prix total TTC',
          'entry_discount': 'Réduction appliquée'
        }"
        @row-click="(row) => this.$router.push('/products/' + row.product_id)"
      />
    </div>
    <div class="box-footer">
      <div class="field">
        <div class="label">Montant du panier TTC</div>
        <div class="value xl">{{ this.$app.parseDecimal(this.basketPrice) }} €</div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../Table'
export default {
  name: 'BasketInformation',
  components: { Table },
  props: ['basket'],
  methods: {
    getFormatedEntries () {
      const entries = this.getBasketEntries(this.basket.id)
      const toReturn = []
      for (const entryId in entries) {
        const entry = entries[entryId]
        const product = this.getProduct(entry.product_id)
        toReturn.push({
          id: entry.id,
          product_id: product.id,
          product_name: product.name,
          quantity: parseInt(entry.quantity),
          product_price: this.$app.parseDecimal(entry.entry_price / entry.quantity) + ' €',
          entry_price: this.$app.parseDecimal(entry.entry_price) + ' €',
          entry_discount: this.$app.parseDecimal(entry.entry_discount) + '%'
        })
      }
      return toReturn
    }
  },
  computed: {
    basketPrice () {
      return this.getBasketEntries(this.basket.id).reduce((total, obj) => parseFloat(obj.entry_price) + total, 0)
    }
  }
}
</script>

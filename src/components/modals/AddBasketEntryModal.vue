<template>
  <fieldset>
    <div class="field">
      <div class="label">Produit</div>
      <div class="value">
        <ProductSelector @update="this.updateProduct"/>
      </div>
    </div>
    <div class="field">
      <div class="label">Quantité</div>
      <div class="value"><input type="number" class="input" placeholder="1" v-model="quantity"></div>
    </div>
    <div class="field">
      <div class="label">Réduction (%)</div>
      <div class="value"><input type="number" class="input" placeholder="0" v-model="entry_discount"></div>
    </div>
    <input type="submit" class="button cta" value="Enregistrer" @click="this.addEntry">
  </fieldset>
</template>

<script>
import ProductSelector from '../products/ProductSelector'
import Vue from 'vue'

export default {
  name: 'AddBasketEntryModal',
  components: { ProductSelector },
  data () {
    return {
      quantity: 1,
      entry_discount: 0,
      product: null
    }
  },
  props: ['entries'],
  methods: {
    updateProduct ({ product }) {
      this.product = product
    },
    addEntry: function () {
      const notification = {
        group: 'notifications', title: 'Ajout d\'entrée', text: 'Entrée ajoutée', type: 'error'
      }
      if (this.product !== null) {
        if (parseInt(this.quantity) >= 1) {
          if (parseFloat(this.entry_discount) >= 0 && parseFloat(this.entry_discount) < 100) {
            notification.type = 'success'
            const toPush = Object.assign({}, this.$data)
            toPush.product_name = this.product.name
            toPush.product_id = this.product.id
            toPush.entry_price = this.$app.parseDecimal((this.product.price * this.quantity) - ((this.product.price * this.quantity) * (this.entry_discount / 100)))
            toPush.price = toPush.entry_price + ' €'
            this.entries.push(toPush)
            this.$emit('close')
          } else notification.text = 'Réduction invalide'
        } else notification.text = 'Quantité invalide'
      } else notification.text = 'Produit invalide'
      Vue.prototype.$notify(notification)
    }
  }
}
</script>

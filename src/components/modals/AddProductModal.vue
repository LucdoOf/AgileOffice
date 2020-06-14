<template>
  <fieldset>
    <div class="field">
      <div class="label">Nom</div>
      <div class="value">
        <input type="text" class="input" placeholder="Guitare électrique" v-model="name">
      </div>
    </div>
    <div class="field">
      <div class="label">Prix</div>
      <div class="value">
        <input type="text" class="input" placeholder="5.5" v-model="price">
      </div>
    </div>
    <div class="field">
      <div class="label">Stock initial</div>
      <div class="value">
        <input type="number" class="input" placeholder="200" v-model="stock">
      </div>
    </div>
    <input type="submit" class="button cta" value="Enregistrer" @click="this.addProduct">
  </fieldset>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddProductModal',
  data: () => {
    return {
      name: '',
      price: 0,
      stock: 0
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    addProduct: function () {
      this.$app.request('/products/create', 'put', this.$data).then(response => {
        this.$emit('close')
        this.$app.treatResponse(response, 'Création de produit')
        this.fetchProducts()
      })
    }
  }
}
</script>

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
      <div class="label">Catégorie</div>
      <div class="value">
        <CategorySelector ref="selector"/>
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
import CategorySelector from '../products/CategorySelector'

export default {
  name: 'AddProductModal',
  components: { CategorySelector },
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
      const toSend = Object.assign({}, this.$data)
      toSend.category_id = this.$refs.selector.category ? this.$refs.selector.category.id : null
      this.$app.request('/products/create', 'put', toSend).then(response => {
        if (this.$app.treatResponse(response, 'Création de produit')) {
          this.$emit('close')
          this.fetchProducts()
        }
      })
    }
  }
}
</script>

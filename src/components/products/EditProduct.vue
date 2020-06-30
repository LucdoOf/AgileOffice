<template>
  <div class="box">
    <div class="box-title"><span class="title">Édition</span></div>
    <div class="box-content">
      <div class="field">
        <div class="label">Nom</div>
        <div class="value"><input type="text" v-model="name"></div>
      </div>
      <div class="field">
        <div class="label">Description</div>
        <div class="value"><textarea v-model="description"/></div>
      </div>
      <div class="field">
        <div class="label">Stock restant</div>
        <div class="value"><input type="number" v-model="stock"></div>
      </div>
      <div class="field">
        <div class="label">Prix</div>
        <div class="value"><input type="text" v-model="price"></div>
      </div>
      <div class="field">
        <div class="label">Catégorie</div>
        <div class="value">
          <CategorySelector ref='selector' :initial-category="product.category"/>
          <i v-if="product.category" @click="$router.push({ name: 'category', params: { id: product.category.id }})" class="clickable fas fa-sign-out-alt l"/>
        </div>
      </div>
      <div class="field">
        <div class="label">Boosté</div>
        <div class="value"><input type="checkbox" v-model="boosted"></div>
      </div>
      <div class="field">
        <div class="label">Activé</div>
        <div class="value"><input type="checkbox" v-model="enabled"></div>
      </div>
    </div>
    <div class="box-footer">
      <div class="button-group">
        <a class="button" @click="$router.push('/products')">Annuler</a>
        <a class="button green" @click="save()">Enregistrer</a>
      </div>
    </div>
  </div>
</template>

<script>

import CategorySelector from './CategorySelector'

export default {
  name: 'EditProduct',
  components: { CategorySelector },
  props: ['product'],
  data: () => {
    return {
      name: '',
      description: '',
      stock: -1,
      price: -1,
      boosted: 0,
      enabled: 0
    }
  },
  methods: {
    save () {
      const toSend = Object.assign({}, this.$data)
      toSend.category_id = this.$refs.selector.category ? this.$refs.selector.category.id : null
      this.$app.request('/products/' + this.product.id + '/update', 'post', toSend).then(response => {
        this.$app.treatResponse(response, 'Produit ' + this.product.reference)
      })
    }
  },
  created () {
    this.name = this.product.name
    this.description = this.product.description
    this.stock = this.product.stock
    this.price = this.product.price
    this.boosted = this.product.boosted
    this.enabled = this.product.enabled
  }
}
</script>

<template>
  <div class="box">
    <div class="box-title"><span class="title">Édition</span></div>
    <div class="box-content">
      <div class="field">
        <div class="label">Nom</div>
        <div class="value"><input type="text" v-model="name"></div>
      </div>
      <div class="field">
        <div class="label">Slug</div>
        <div class="value">{{ category.slug }}</div>
      </div>
      <div class="field">
        <div class="label">Catégorie parente</div>
        <div class="value"><CategorySelector ref="selector" :initial-category="category.parent"/></div>
      </div>
      <div class="field">
        <div class="label">Date de création</div>
        <div class="value">Le {{ this.$app.formatDate(category.created_at_stamp) }}</div>
      </div>
      <div class="field">
        <div class="label">Produits rattachés</div>
        <div class="value">{{ this.getProducts.filter(product => product.category_id === this.category.id).length }}</div>
      </div>
    </div>
    <div class="box-footer">
      <div class="button-group">
        <a class="button" @click="$router.push({ name: 'categories' })">Annuler</a>
        <a class="button green" @click="save()">Enregistrer</a>
      </div>
    </div>
  </div>
</template>

<script>

import CategorySelector from './CategorySelector'
import { mapActions } from 'vuex'

export default {
  name: 'EditCategory',
  components: { CategorySelector },
  props: ['category'],
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchProducts']),
    save () {
      const toSend = Object.assign({}, this.$data)
      toSend.parent_id = this.$refs.selector.category ? this.$refs.selector.category.id : 0
      this.$app.request('/categories/' + this.category.id + '/update', 'post', toSend).then(response => {
        this.$app.treatResponse(response, 'Catégorie ' + this.category.name)
        this.fetchCategories()
        this.fetchProducts()
      })
    }
  },
  created () {
    this.name = this.category.name
  }
}
</script>

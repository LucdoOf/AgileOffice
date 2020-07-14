<template>
  <fieldset>
    <div class="field">
      <div class="label">Nom</div>
      <div class="value">
        <input type="text" class="input" placeholder="Guitare électrique" v-model="name">
      </div>
    </div>
    <div class="field">
      <div class="label">Catégorie parente</div>
      <div class="value">
        <CategorySelector ref="selector"/>
      </div>
    </div>
    <input type="submit" class="button cta" value="Enregistrer" @click="this.addCategory">
  </fieldset>
</template>

<script>

import { mapActions } from 'vuex'
import CategorySelector from '../products/CategorySelector'

export default {
  name: 'AddCategoryModal',
  components: { CategorySelector },
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['fetchCategories']),
    addCategory: function () {
      const data = {
        parent_id: this.$refs.selector.category ? this.$refs.selector.category.id : null,
        name: this.name
      }
      this.$app.request('/categories/create', 'put', data).then(response => {
        this.$emit('close')
        this.$app.treatResponse(response, 'Création de catégorie')
        this.fetchCategories()
      })
    }
  }
}
</script>

<template>
  <fieldset>
    <div class="field">
      <div class="label">Nom</div>
      <div class="value">
        <input type="text" class="input" placeholder="Couverture produit" v-model="name">
      </div>
    </div>
    <div class="field">
      <div class="label">Type</div>
      <div class="value">
        <ProductMediaTypeSelector ref="selector"/>
      </div>
    </div>
    <div class="field">
      <div class="label">Fichier</div>
      <div class="value">
        <input type="file" ref="fileInput"/>
      </div>
    </div>
    <input type="submit" class="button cta" value="Enregistrer" @click="this.uploadMedia">
  </fieldset>
</template>

<script>

import { mapActions } from 'vuex'
import ProductMediaTypeSelector from '../products/ProductMediaTypeSelector'

export default {
  name: 'AddCategoryModal',
  components: { ProductMediaTypeSelector },
  props: ['product'],
  data: () => {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    uploadMedia: function () {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('type', this.$refs.selector.media ? this.$refs.selector.media.id : null)
      formData.append('name', this.name)
      formData.append('file', file)
      this.$app.request('/products/' + this.product.id + '/medias/upload', 'post', formData).then(response => {
        if (this.$app.treatResponse(response, 'Téléchargement du média')) {
          this.$emit('close')
          this.fetchProducts()
        }
      })
    }
  }
}
</script>

<template>
  <div class="box">
    <div class="box-title">
      <span class="title">Médias liés</span>
      <div class="box-actions">
        <a class="link" @click="addMedia">Télécharger un nouveau média</a>
      </div>
    </div>
    <div class="box-content" :class="{ 'gray' : this.product.linked_medias.length <= 0 }">
      <div class="box-message" v-if="this.product.linked_medias.length <= 0">Aucun média lié</div>
      <div class="field" v-else v-for="media in this.product.linked_medias" :key="media.id">
        <div class="label">{{ media.name }}</div>
        <div class="value">
          <a class="link" target="_blank" :href="media.url">{{ media.url }}</a>
          <span class="badge l">{{ media.type }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddMediaModal from '../modals/AddMediaModal'

export default {
  name: 'ProductMedias',
  props: ['product'],
  methods: {
    addMedia () {
      this.$modal.show(AddMediaModal, { product: this.product })
    }
  }
}
</script>

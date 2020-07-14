<template>
  <multiselect v-model="media"
               :options="[
                 { id:'thumbnail', name: 'Miniature' },
                 { id:'cover', name: 'Couverture' },
                 { id:'other', name: 'Autre' }
               ]"
               track-by="id"
               :showLabels="false"
               :custom-label="(media) => media.name"
               :disabled="this.disabled"
               placeholder="Type de média">
    <template slot="singleLabel" slot-scope="props">
      {{ props.option.name }}
    </template>
    <template slot="option" slot-scope="props">
      {{ props.option.name }}
    </template>
    <template slot="noResult">
      Aucun résultat
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'ProductMediaTypeSelector',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    initialMedia: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      media: null
    }
  },
  beforeMount () {
    this.media = this.initialMedia
  },
  watch: {
    category (value, oldValue) {
      this.$emit('update', { media: value })
    }
  }
}
</script>

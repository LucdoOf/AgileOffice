<template>
  <multiselect v-model="category"
               :options="this.getCategories"
               track-by="id"
               :showLabels="false"
               :custom-label="(category) => category.name"
               :disabled="this.disabled"
               placeholder="Catégorie">
    <template slot="singleLabel" slot-scope="props">
      {{ props.option.name + ' (' + props.option.slug + ')' }}
    </template>
    <template slot="option" slot-scope="props">
      {{ props.option.name + ' (' + props.option.slug + ')'  }}
    </template>
    <template slot="noResult">
      Aucun résultat
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'CategorySelector',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    initialCategory: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      category: null
    }
  },
  beforeMount () {
    this.category = this.initialCategory
  },
  watch: {
    category (value, oldValue) {
      this.$emit('update', { category: value })
    }
  }
}
</script>

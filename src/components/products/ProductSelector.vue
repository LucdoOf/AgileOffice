<template>
  <multiselect v-model="product"
               :options="this.getProducts"
               track-by="id"
               :showLabels="false"
               style="width: 300px"
               :custom-label="(product) => product.name"
               :disabled="this.disabled"
               placeholder="Produit">
    <template slot="singleLabel" slot-scope="props">
      {{ props.option.name + ' (' + props.option.reference + ')' }}
    </template>
    <template slot="option" slot-scope="props">
      {{ props.option.name + ' (' + props.option.reference + ')'  }}
    </template>
    <template slot="noResult">
      Aucun résultat
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'ProductSelector',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      product: null
    }
  },
  watch: {
    product (value, oldValue) {
      this.$emit('update', { product: value })
    }
  }
}
</script>

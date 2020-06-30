<template>
  <div id="category">
    <div class="row">
      <EditCategory class="w-s6" :category="category"/>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import EditCategory from '../../components/products/EditCategory'

export default {
  name: 'Category',
  components: { EditCategory },
  props: ['id'],
  computed: {
    category () {
      return this.$store.getters.getCategory(this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCategories').then(() => {
      store.dispatch('fetchProducts').then(() => {
        next()
      })
    })
  }
}
</script>

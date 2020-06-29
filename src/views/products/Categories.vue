<template>
  <div id="categories">
    <div class="row">
      <div class="box no-padding w-s12">
        <div class="box-title">
          <span class="title">Catégories</span>
          <div class="box-actions">
            <a class="link" @click="this.addCategory"><i class="fas fa-plus r"/>Ajouter une catégorie</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Table class="w-s12"
             ref='table'
             v-bind:columns="{'slug':'Slug','name':'Nom','parent':'Catégorie parente','created_at':'Date de création'}"
             v-bind:table-data="this.getFormatedCategories()"
             @row-click="(row) => this.$router.push({ name: 'category', params: { id: row.id } })"/>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import Table from '../../components/Table'
import AddCategoryModal from '../../components/modals/AddCategoryModal'

export default {
  name: 'Categories',
  components: { Table },
  methods: {
    addCategory () {
      this.$modal.show(AddCategoryModal)
    },
    getFormatedCategories: function () {
      const formatedCategories = []
      const categories = this.getCategories
      categories.forEach((category, index) => {
        formatedCategories.push({
          id: category.id,
          slug: category.slug,
          name: category.name,
          parent: category.parent ? category.parent.name + ' (' + category.parent.slug + ')' : '&mdash;',
          created_at: this.$app.formatDate(category.created_at_stamp),
          created_at_value: category.created_at_stamp
        })
      })
      return formatedCategories
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCategories').finally(() => {
      next()
    })
  }
}
</script>

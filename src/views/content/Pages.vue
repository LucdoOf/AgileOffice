<template>
  <div id="orders">
    <div class="row">
      <div class="box no-padding w-s12">
        <div class="box-title">
          <span class="title">Traductions par page</span>
        </div>
      </div>
    </div>
    <div class="row">
      <Table class="w-s12"
             ref='table'
             v-bind:columns="{'slug':'Slug','name':'Nom', 'static':'Statique'}"
             v-bind:table-data="this.getPages"
             @row-click="(row) => this.$router.push({ name: 'page', params: { id: row.id } })"/>
    </div>
  </div>
</template>

<script>

import Table from '../../components/Table'

export default {
  name: 'Pages',
  components: { Table }
}

</script>

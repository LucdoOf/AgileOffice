<template>
  <div id="search-modal">
    <input ref='searchInput' id="search-input" class="input xl" placeholder="Jean Dupont, CMD_12345, Ordinateur..." @input="this.search" v-model="search_key"/>
    <Table id="search-table" :columns="{'reference':'Référence','verbosedType':'Type', 'description':'Description'}"
                             :table-data="this.tableData"
                             @row-click="this.rowClick"/>
  </div>
</template>

<script>
import Table from '../Table'
export default {
  name: 'SearchModal',
  components: { Table },
  data () {
    return {
      search_key: '',
      result: []
    }
  },
  computed: {
    tableData () {
      return this.result
    }
  },
  methods: {
    search () {
      this.$app.request('/search/' + this.search_key).then(response => {
        if (response.status !== 404) {
          this.result = response.data
          for (let i = 0; i < this.result.length; i++) {
            const desc = this.$app.getObjectDescriptionAndRoute(this.result[i])
            this.result[i].description = desc.description
            this.result[i].verbosedType = desc.type
            this.result[i].route = desc.route
          }
        } else this.result = []
      })
    },
    rowClick (row) {
      this.$router.push(row.route)
      this.$emit('close')
    }
  },
  mounted () {
    this.$refs.searchInput.focus()
  }
}
</script>

<style>
  #search-table .table-wrapper {
    max-height: 500px;
    overflow-y: auto;
  }
  #search-input {
    width: 100%;
    margin-bottom: 20px;
  }
</style>

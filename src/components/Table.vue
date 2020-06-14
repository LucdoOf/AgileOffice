<template>
  <div class="box no-padding">
    <div class="box-content">
      <div class="table-wrapper" v-bind:class="{ 'empty' : this.tableData.length === 0 }">
        <table class="table">
          <thead>
            <tr>
              <th
                v-for="(colDisplay, colId) in this.columns"
                :key="colId"
                @click="clickCol(colId)"
                :class="{ 'active ' : sortKey === colId }"
              >
                {{colDisplay}}
                <i class="fas l" :class="!sortInverted && sortKey === colId ? 'fa-arrow-down' : 'fa-arrow-up'"/>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in this.tableData" :key="row.id">
              <td
                v-for="(col,index) in getRenderableColumns(row)"
                :key="index+':'+col"
                @click="$emit('row-click',row)"
                v-html="col"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="this.paginated === true" class="box-footer">
      <div class="button-group">
        <button :disabled="this.page <= 1" class="button" @click="this.previousPage">Page précédente</button>
        <a class="button candy">{{ this.page }}</a>
        <button :disabled="this.tableData.length < this.pageLimit" class="button cta" @click="this.nextPage">Page suivante</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data: function () {
    return {
      sortKey: '',
      sortInverted: false,
      page: 1,
      finalSortKey: ''
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Object,
      default: function () {
        return {}
      }
    },
    customSortKeys: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultSort: {
      type: Boolean,
      default: true
    },
    paginated: {
      type: Boolean,
      default: false
    },
    pageLimit: {
      type: Number,
      default: 15
    }
  },
  watch: {
    tableData (value, oldValue) {
      if (!this.$app.arrayContainsSameValues(value, oldValue) && this.defaultSort === true) this.sort()
    },
    page (value, oldValue) {
      this.$emit('update', this.$data)
    }
  },
  methods: {
    previousPage () {
      if (this.page > 1) this.page--
    },
    nextPage () {
      if (this.tableData.length >= 15) this.page++
    },
    clickCol (colId) {
      if (this.sortKey === colId) {
        this.sortInverted = !this.sortInverted
        if (this.defaultSort === true) this.sort()
      } else {
        this.sortInverted = false
        this.sortKey = colId
        if (this.defaultSort === true) this.sort()
      }
      this.finalSortKey = this.customSortKeys[colId] ?? colId
      this.$emit('update', this.$data)
      this.$emit('sort', this.customSortKeys[colId] ?? colId, this.sortInverted)
    },
    sort () {
      this.tableData.sort((a, b) => {
        let compare = 0

        a = a[this.sortKey + '_value'] ? a[this.sortKey + '_value'] : a[this.sortKey]
        b = b[this.sortKey + '_value'] ? b[this.sortKey + '_value'] : b[this.sortKey]

        const va = typeof a === 'string' ? (a.includes(' €') ? parseFloat(a.split(' ')[0]) : a) : a
        const vb = typeof b === 'string' ? (b.includes(' €') ? parseFloat(b.split(' ')[0]) : b) : b

        if (va > vb) {
          compare = this.sortInverted ? -1 : 1
        } else if (vb > va) {
          compare = this.sortInverted ? 1 : -1
        }
        return compare
      })
    },
    getRenderableColumns (row) {
      const toReturn = {}
      Object.keys(this.columns).forEach(function (item, index) {
        toReturn[item] = row[item]
      })
      return toReturn
    }
  },
  mounted () {
    this.$emit('update', this.$data)
  }
}
</script>

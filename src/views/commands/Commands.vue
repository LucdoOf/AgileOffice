<template>
  <div id="orders">
    <div class="row">
      <div class="box no-padding w-s12">
        <div class="box-title">
          <span class="title">Dernières commandes</span>
          <div class="box-actions">
            <CommandStatusSelector ref='status' @update="this.updateCommands"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
        <Table class="w-s12"
               ref='table'
               :default-sort="false"
               :paginated="true"
               v-bind:columns="{'reference':'Référence','buyer':'Acheteur','amount':'Montant TTC','order_date':'Date','status':'Status'}"
               v-bind:customSortKeys="{'buyer':'user.lastname','amount':'SUM(basket_entry.entry_price)'}"
               v-bind:table-data="this.getFormatedCommands()"
               @update="this.updateCommands"
               @row-click="(row) => this.$router.push({ name: 'command', params: { id: row.id } })"/>
      </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import Table from '../../components/Table'
import CommandStatusSelector from '../../components/commands/CommandStatusSelector'

export default {
  name: 'Commands',
  components: { CommandStatusSelector, Table },
  methods: {
    ...mapActions(['fetchPaginatedCommands', 'fetchUsers']),
    getFormatedCommands: function () {
      const formatedCommands = []
      const commands = this.getPaginatedCommands
      commands.forEach((command, index) => {
        const linkedBasket = command.basket
        if (linkedBasket) {
          const entries = linkedBasket.entries
          const amount = entries.reduce((total, obj) => parseFloat(obj.entry_price) + total, 0)
          formatedCommands.push({
            id: command.id,
            reference: command.reference,
            buyer: command.basket.user.lastname + ' ' + command.basket.user.firstname,
            amount: this.$app.parseDecimal(amount) + '  €',
            order_date: this.$app.formatDate(command.order_date_stamp),
            status: this.$app.formatCommandStatus(command.status)
          })
        }
      })
      return formatedCommands
    },
    updateCommands () {
      const sortKey = this.$refs.table.finalSortKey ? (this.$refs.table.finalSortKey + (this.$refs.table.sortInverted ? ' DESC' : ' ASC')) : null
      const filters = {}
      filters.status = this.$refs.status.filter_status ? this.$refs.status.filter_status.value : null
      this.fetchPaginatedCommands({ page: this.$refs.table.page, filters: filters, sort: sortKey })
    }
  }
}

</script>

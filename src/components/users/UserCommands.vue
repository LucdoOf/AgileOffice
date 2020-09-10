<template>
  <div class="box no-padding">
    <div class="box-title"><span class="title">Commandes passées</span></div>
    <div class="box-content">
      <Table @row-click="(row) => this.$router.push({ name: 'command', params: { id: row.id }})"
             :table-data="this.getFormatedCommands()"
             :columns="{'reference':'Réference','amount':'Montant TTC','order_date':'Date'}"/>
    </div>
  </div>
</template>

<script>
import Table from '../Table'

export default {
  name: 'UserCommands',
  components: { Table },
  props: ['user'],
  methods: {
    getFormatedCommands: function () {
      const commands = this.getActualUserCommands
      const formatedCommands = []
      for (let i = 0; i < commands.length; i++) {
        const command = Object.assign({}, commands[i])
        if (command) {
          command.order_date_value = command.order_date_stamp
          command.order_date = this.$app.formatDate(command.order_date_stamp)
          command.amount = this.$app.parseDecimal(command.basket.entries.reduce((total, obj) => parseFloat(obj.entry_price) + total, 0)) + ' €'
          formatedCommands.push(command)
        }
      }
      return formatedCommands
    }
  }
}
</script>

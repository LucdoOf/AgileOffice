<template>
  <div id="command">
    <div class="row">
      <BasketInformation :command="this.command" class="col-12">Panier lié</BasketInformation>
    </div>
    <div class="row">
      <div class="col-12 col-xl-8">
        <div class="row">
          <CommandInformation :command="this.command" class="col-12 wr"/>
        </div>
        <div class="row">
          <CommandHistory ref="history" :command="this.command" class="col-12 wr"/>
        </div>
        <div class="row">
          <CommandTransactions :command="this.command" class="col-12 wr"/>
        </div>
      </div>
      <div class="col-12 col-xl-4">
        <div class="row">
          <CommandStatus @update='$refs.history.updateHistory()' :command="this.command" class="col-12 wr"/>
        </div>
        <div class="row">
          <Address :address="this.command.billing_address" class="col-12 wr">Adresse de facturation</Address>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import CommandInformation from '../../components/commands/CommandInformation'
import BasketInformation from '../../components/baskets/CommandBasketInformation'
import CommandStatus from '../../components/commands/CommandStatus'
import CommandHistory from '../../components/commands/CommandHistory'
import Address from '../../components/users/Address'
import CommandTransactions from '../../components/commands/CommandTransactions'

export default {
  name: 'Command',
  components: { CommandTransactions, Address, CommandHistory, CommandStatus, BasketInformation, CommandInformation },
  props: ['id'],
  computed: {
    command () {
      return this.$store.getters.getActualCommand
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommand', to.params).finally(() => {
      next()
    })
  }
}
</script>

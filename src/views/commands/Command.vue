<template>
  <div id="command">
    <div class="row">
      <BasketInformation :command="this.command" :basket="this.basket" class="w-s12">Panier lié</BasketInformation>
    </div>
    <div class="row">
      <div class="w-s8">
        <div class="row">
          <CommandInformation :command="this.command" class="w-s12 wr"/>
        </div>
        <div class="row">
          <CommandHistory ref="history" :command="this.command" class="w-s12 wr"/>
        </div>
      </div>
      <div class="w-s4">
        <div class="row">
          <CommandStatus @update='$refs.history.updateHistory()' :command="this.command" class="w-s12 wr"/>
        </div>
        <div class="row">
          <Address :address="this.command.billing_address" class="w-s12 wr">Adresse de facturation</Address>
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

export default {
  name: 'Command',
  components: { Address, CommandHistory, CommandStatus, BasketInformation, CommandInformation },
  props: ['id'],
  computed: {
    command () {
      return this.$store.getters.getCommand(this.id)
    },
    basket () {
      return this.$store.getters.getBasket(this.command.basket_id)
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands').finally(() => {
      store.dispatch('fetchBaskets').finally(() => {
        store.dispatch('fetchBasketEntries').finally(() => {
          store.dispatch('fetchProducts').finally(() => {
            next()
          })
        })
      })
    })
  }
}
</script>

<template>
  <div id="transaction" class="row">
    <div class="col-12 col-xl-6">
      <div class="row">
        <TransactionInformation class="col-12 wr" :transaction="this.transaction"/>
      </div>
      <div class="row">
        <TransactionPartnerResponse class="col-12 wr" :transaction="this.transaction"/>
      </div>
    </div>
    <div class="col-12 col-xl-6">
      <div class="row">
        <div class="box col-12 wr" v-if="transaction.command_id <= 0">
          <div class="box-title"><span class="title">Commande liée</span></div>
          <div class="box-content gray">
            <span class="box-message">Aucune commande liée</span>
          </div>
        </div>
        <CommandBasketInformation class="col-12 wr" v-else :basket="transaction.command.basket" :command="transaction.command">Commande liée</CommandBasketInformation>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import CommandBasketInformation from '../../components/baskets/CommandBasketInformation'
import TransactionInformation from '../../components/transactions/TransactionInformation'
import TransactionPartnerResponse from '../../components/transactions/TransactionPartnerResponse'

export default {
  name: 'Transaction',
  components: { TransactionPartnerResponse, TransactionInformation, CommandBasketInformation },
  props: ['id'],
  computed: {
    transaction () {
      return this.$store.getters.getActualTransaction
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchTransaction', { id: to.params.id ?? -1 }).finally(() => {
      next()
    })
  }
}
</script>

<style scoped>

</style>

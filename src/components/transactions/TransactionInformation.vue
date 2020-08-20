<template>
  <div class="box">
    <div class="box-title"><span class="title">Informations sur la transaction</span></div>
    <div class="box-content">
      <div class="field">
        <div class="label">Montant</div>
        <div class="value">{{ this.$app.parseDecimal(transaction.amount) }} €</div>
      </div>
      <div class="field">
        <div class="label">Moyen de paiement</div>
        <div class="value">{{ transaction.payment_mode_method ? transaction.payment_mode_method : '&mdash;' }}</div>
      </div>
      <div class="field">
        <div class="label">Créée le</div>
        <div class="value">{{ this.$app.formatDate(transaction.created_at_stamp) }}</div>
      </div>
      <div class="field">
        <div class="label">Status</div>
        <div class="value" v-html="this.$app.formatTransactionStatus(transaction.status)"></div>
      </div>
      <div class="field">
        <div class="label">Type</div>
        <div class="value" v-html="this.$app.formatTransactionType(transaction.transaction_type)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionInformation',
  props: ['transaction']
}
</script>

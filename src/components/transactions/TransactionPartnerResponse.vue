<template>
  <div class="box">
    <div class="box-title"><span class="title">Réponse du partenaire</span></div>
    <div class="box-content gray" v-if="!transaction.partner_response">
      <span class="box-message">Aucune réponse n'a été transmise pour le moment</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionPartnerResponse',
  props: ['transaction']
}
</script>

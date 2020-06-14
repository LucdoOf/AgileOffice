<template>
  <div class="box">
    <div class="box-title">
      <span class="title">Informations sur la commande</span>
    </div>
    <div class="box-content">
      <div class="field">
        <div class="label">Utilisateur</div>
        <router-link tag="a" :to="{name:'user',params: {id:this.command.basket.user_id}}" class="value link">{{ this.command.basket.user.lastname + " " + this.command.basket.user.firstname + " (" + this.command.basket.user.reference + ")" }}</router-link>
      </div>
      <div class="field">
        <div class="label">Date d'achat</div>
        <div class="value">Le {{ this.$app.formatDate(command.order_date_stamp) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandInformation',
  props: ['command']
}
</script>

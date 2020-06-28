<template>
  <div class="box">
    <div class="box-title"><span class="title">Informations</span></div>
    <div class="box-content">
      <div class="field">
        <div class="label">Nom</div>
        <div class="value">{{ this.user.lastname }}</div>
      </div>
      <div class="field">
        <div class="label">Prénom</div>
        <div class="value">{{ this.user.firstname }}</div>
      </div>
      <div class="field">
        <div class="label">Mail</div>
        <div class="value">{{ this.user.mail }}</div>
      </div>
      <div class="field">
        <div class="label">Dernière connection</div>
        <div class="value">{{ this.user.last_seen ? 'Le ' + this.$app.formatDate(this.user.last_seen_stamp) : '&mdash;' }}</div>
      </div>
      <div class="field">
        <div class="label">Date d'inscription</div>
        <div class="value">Le {{ this.$app.formatDate(this.user.inscription_date_stamp) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInformation',
  props: ['user']
}
</script>

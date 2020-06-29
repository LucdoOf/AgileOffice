<template>
  <div class="box">
    <div class="box-title"><span class="title"><slot/></span></div>
    <div class="box-content">
      <div class="field">
        <div class="label">Nom</div>
        <div class="value">{{ this.address.lastname }}</div>
      </div>
      <div class="field">
        <div class="label">Prénom</div>
        <div class="value">{{ this.address.firstname }}</div>
      </div>
      <div class="field">
        <div class="label">Adresse</div>
        <div class="value">{{ this.address.address }}</div>
      </div>
      <div class="field">
        <div class="label">Ville</div>
        <div class="value">{{ this.address.city }}</div>
      </div>
      <div class="field">
        <div class="label">Code postal</div>
        <div class="value">{{ this.address.zipcode }}</div>
      </div>
      <div class="field">
        <div class="label">Pays</div>
        <div class="value">{{ this.address.country }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Address',
  props: ['address']
}
</script>

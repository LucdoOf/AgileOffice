<template>
  <div class="box">
    <div class="box-title">
      <span class="title"><slot/></span>
    </div>
    <div class="box-content-group">
      <div class="box-content" :class="{ 'gray' : select === false }">
        <div class="field">
          <div class="label">Choisissez une adresse</div>
          <div class="value"><AddressSelector ref='selector' @update="this.updateSelector" :user="this.user"/></div>
        </div>
      </div>
      <div class="box-content" :class="{ 'gray' : select === true }">
        <div class="field">
          <div class="label">Nom</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="lastname"></div>
        </div>
        <div class="field">
          <div class="label">Prénom</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="firstname"></div>
        </div>
        <div class="field">
          <div class="label">Adresse</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="address"></div>
        </div>
        <div class="field">
          <div class="label">Ville</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="city"></div>
        </div>
        <div class="field">
          <div class="label">Code postal</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="zipcode"></div>
        </div>
        <div class="field">
          <div class="label">Pays</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="country"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressSelector from './AddressSelector'
export default {
  name: 'AddressSelectOrCreate',
  components: { AddressSelector },
  data () {
    return {
      select: false,
      user: null,
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      zipcode: '',
      country: ''
    }
  },
  methods: {
    updateSelector ({ address }) {
      this.select = address !== null
    },
    getFinalAddress () {
      if (this.select === true) return this.$refs.selector.address
      return this.$data
    }
  }
}
</script>

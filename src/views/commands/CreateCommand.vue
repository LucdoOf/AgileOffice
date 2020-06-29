<template>
  <div id="create-command">
    <div class="row">
      <div class="w-s6 wr">
        <div class="row">
          <UserSelectOrCreate ref='user' class="w-s12" @selectUpdate="this.userSelectUpdate"/>
        </div>
        <div class="row">
          <BasketEditor ref='basket' class="w-s12"/>
        </div>
        <div class="row">
          <div class="w-s12 box">
            <div class="box-top-actions">
              <div class="button-group end">
                <router-link to="/commands" class="link">Annuler</router-link>
                <a class="link" @click="$refs.basket.entries = []">Vider le panier</a>
                <a class="button cta" @click="this.addCommand">Enregistrer la commande</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-s6 wr">
        <div class="row">
          <div class="box no-padding w-s12">
            <div class="box-content">
              <AddressSelectOrCreate ref='shipping_address' class="w-s12 wr">Adresse de livraison</AddressSelectOrCreate>
            </div>
            <div class="box-footer">
              <div class="field min">
                <div class="label">Même adresse de facturation</div>
                <div class="value">
                  <input type="checkbox" class="checkbox" v-model="sameShippingThanBilling"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <AddressSelectOrCreate ref='billing_address' class="w-s12" :class="{ 'hidden' : sameShippingThanBilling === true }">Adresse de facturation</AddressSelectOrCreate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSelectOrCreate from '../../components/users/UserSelectOrCreate'
import { mapActions } from 'vuex'
import BasketEditor from '../../components/baskets/BasketEditor'
import AddressSelectOrCreate from '../../components/users/AddressSelectOrCreate'

export default {
  name: 'CreateCommand',
  components: { AddressSelectOrCreate, BasketEditor, UserSelectOrCreate },
  data () {
    return {
      sameShippingThanBilling: true
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchProducts', 'createCommand']),
    addCommand () {
      const command = {}
      command.entries = this.$refs.basket.entries
      command.user = this.$refs.user.getFinalUser()
      command.shipping_address = this.$refs.shipping_address.getFinalAddress()
      command.billing_address = this.sameShippingThanBilling ? command.shipping_address : this.$refs.billing_address.getFinalAddress()
      this.createCommand(command).then(response => {
        if (response.status === 200) this.$router.push('/commands/' + response.data.data.command.id)
      })
    },
    userSelectUpdate ({ user }) {
      this.$refs.shipping_address.user = user
      this.$refs.billing_address.user = user
    }
  },
  created () {
    this.fetchUsers()
    this.fetchProducts()
  }
}
</script>

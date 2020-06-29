<template>
  <div id="command-shipping">
    <Address class="w-s4" :address="this.command.shipping_address">Adresse de livraison</Address>
  </div>
</template>

<script>
import store from '../../store'
import Address from '../../components/users/Address'

export default {
  name: 'CommandShipping',
  components: { Address },
  props: ['id'],
  computed: {
    command () {
      return this.$store.getters.getCommand(this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchCommands').finally(() => {
      next()
    })
  }
}
</script>

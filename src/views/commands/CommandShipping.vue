<template>
  <div id="command-shipping">
    <div class="row">
      <Address class="w-s4" :address="this.command.shipping_address">Adresse de livraison</Address>
      <CommandTracking class="w-s8" :command="this.command"/>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import Address from '../../components/users/Address'
import CommandTracking from '../../components/commands/CommandTracking'

export default {
  name: 'CommandShipping',
  components: { CommandTracking, Address },
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

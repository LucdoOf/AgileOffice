<template>
  <div id="user">
    <div class="row">
      <div class="w-s6">
        <div class="row">
          <UserInformation class="w-s12 wr" :user="this.user"/>
        </div>
      </div>
      <div class="w-s6">
        <div class="row">
          <UserCommands class="w-s12 wr" :user="this.user"/>
        </div>
        <div class="row">
          <UserAddressTable class="w-s12 wr" :user="this.user"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import UserInformation from '../../components/users/UserInformation'
import UserCommands from '../../components/users/UserCommands'
import UserAddressTable from '../../components/users/UserAddressTable'

export default {
  name: 'User',
  components: { UserAddressTable, UserCommands, UserInformation },
  props: ['id'],
  computed: {
    user () {
      return this.$store.getters.getUser(this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchUsers').finally(() => {
      store.dispatch('fetchCommands').finally(() => {
        next()
      })
    })
  }
}
</script>

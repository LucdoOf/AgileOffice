<template>
  <div id="user">
    <div class="row">
      <UserInformation class="w-s6" :user="this.user"/>
      <UserCommands class="w-s6" :user="this.user"/>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import UserInformation from '../../components/users/UserInformation'
import UserCommands from '../../components/users/UserCommands'

export default {
  name: 'User',
  components: { UserCommands, UserInformation },
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

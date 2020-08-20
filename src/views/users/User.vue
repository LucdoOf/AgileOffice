<template>
  <div id="user">
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="row">
          <UserInformation class="col-12 wr" :user="this.user"/>
        </div>
        <div class="row">
          <MailTable class="col-12 wr" :mails="this.user.sent_mails" :user_id="parseInt(this.user.id)" :target="this.user.mail"/>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row">
          <UserCommands class="col-12 wr" :user="this.user"/>
        </div>
        <div class="row">
          <UserAddressTable class="col-12 wr" :user="this.user"/>
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
import MailTable from '../../components/miscellaneous/MailTable'

export default {
  name: 'User',
  components: { MailTable, UserAddressTable, UserCommands, UserInformation },
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

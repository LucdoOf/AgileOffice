<template>
  <div id="users-stats">
    <div class="row">
    <UsersChart class="w-s6"/>
    <InactiveUsers class="w-s6"/>
    </div>
  </div>
</template>

<script>
import UsersChart from '../../components/stats/UsersChart'
import store from '../../store'
import InactiveUsers from '../../components/stats/InactiveUsers'

export default {
  name: 'UsersStats',
  components: { InactiveUsers, UsersChart },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchUsers').finally(() => {
      next()
    })
  }
}
</script>

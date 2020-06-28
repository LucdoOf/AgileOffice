<template>
  <div id="users-stats">
    <div class="row">
      <ActiveUsers class="w-s4"/>
      <InactiveUsers class="w-s4"/>
      <AverageUsersConnectionByDay class="w-s4"/>
    </div>
    <div class="row">
      <UsersInscriptionsChart class="w-s6"/>
      <UsersConnectionsChart class="w-s6"/>
    </div>
  </div>
</template>

<script>
import UsersInscriptionsChart from '../../components/stats/UsersInscriptionsChart'
import store from '../../store'
import InactiveUsers from '../../components/stats/InactiveUsers'
import UsersConnectionsChart from '../../components/stats/UsersConnectionsChart'
import ActiveUsers from '../../components/stats/ActiveUsers'
import AverageUsersConnectionByDay from '../../components/stats/AverageUsersConnectionByDay'

export default {
  name: 'UsersStats',
  components: { AverageUsersConnectionByDay, ActiveUsers, UsersConnectionsChart, InactiveUsers, UsersInscriptionsChart },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchUsers').finally(() => {
      next()
    })
  }
}
</script>

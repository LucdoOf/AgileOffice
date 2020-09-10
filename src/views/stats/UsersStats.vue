<template>
  <div id="users-stats">
    <div class="row">
      <ActiveUsers class="col-12 col-lg-4"/>
      <InactiveUsers class="col-12 col-lg-4"/>
      <AverageUsersConnectionByDay class="col-12 col-lg-4"/>
    </div>
    <div class="row">
      <UsersInscriptionsChart class="col-12 col-lg-6"/>
      <UsersConnectionsChart class="col-12 col-lg-6"/>
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
    store.dispatch('fetchUsers')
    next()
  }
}
</script>

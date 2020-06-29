<template>
  <div class="box small">
    <div class="box-content">
      <div class="field">
        <div class="label nowrap">
          Nombre de connections moyennes par jour
        </div>
        <div class="value xl">{{ this.$app.parseDecimal(averageUsers) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AverageUsersConnectionByDay',
  computed: {
    averageUsers () {
      const users = this.getUsers
      const toAggregate = []
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        if (user && user.last_seen) {
          toAggregate.push({
            quantity: 1,
            last_seen: user.last_seen_stamp * 1000
          })
        }
      }
      const aggregatedData = this.$app.aggregatePerDay(toAggregate, 'last_seen', 'quantity')
      return Object.values(aggregatedData).reduce((total, obj) => total + parseInt(obj), 0) / Object.values(aggregatedData).length
    }
  }
}
</script>

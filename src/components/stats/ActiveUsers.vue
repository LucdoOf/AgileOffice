<template>
  <div class="box small">
    <div class="box-content">
      <div class="field">
        <div class="label nowrap">
          Utilisateurs actifs
        </div>
        <div class="value xl">
          {{ activeUsers }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveUsers',
  computed: {
    activeUsers () {
      const users = this.getUsers
      let toReturn = 0
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        if (user) {
          if (((new Date()).getTime() - user.last_seen_stamp * 1000) < 1000 * 30 * 24 * 60 * 60) toReturn++
        }
      }
      return toReturn
    }
  }
}
</script>

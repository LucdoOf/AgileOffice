<template>
  <div class="box small">
    <div class="box-content">
      <div class="field">
        <div class="label nowrap">
          Utilisateurs inactifs
          <i class="fas fa-question-circle l popover">
            <span class="popover-container">Un utilisateur est considéré comme inactif au bout de 30 jours au cours desquels il ne s'est pas connecté à son compte</span>
          </i>
        </div>
        <div class="value xl">{{ inactiveUsers }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InactiveUsers',
  computed: {
    inactiveUsers () {
      const users = this.getUsers
      let toReturn = 0
      for (let i = 0; i < users.length; i++) {
        const user = users[i]
        if (user) {
          if (((new Date()).getTime() - user.last_seen_stamp * 1000) >= 1000 * 30 * 24 * 60 * 60) toReturn++
        }
      }
      return toReturn
    }
  }
}
</script>

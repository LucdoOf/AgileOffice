<template>
  <div id="header" class="rw aw">
    <nav class="rw aw jws">
      <ul>
        <li v-for="route in this.actualRoutes" v-bind:key="route.display"><router-link class="link" v-bind:to="route.to">{{ route.display }}</router-link></li>
      </ul>
      <div class="connected-user">
        <span class="link" v-if="this.getConnectedUser !== null"><i class="fas fa-user r"/>{{ this.getConnectedUser.name }}</span>
        <router-link class="link" v-else to="/login"><i class="fas fa-user r"/>Invité</router-link>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      actualRoutes: []
    }
  },
  watch: {
    $route: function (to, from) {
      this.updateRoutes()
    }
  },
  mounted () {
    this.updateRoutes()
  },
  methods: {
    updateRoutes () {
      const toReturn = []
      const actualRoute = this.$router.currentRoute.path.split('/')[1]
      const allRoutes = this.$store.getters.getHeaderRoutes
      if (allRoutes[actualRoute]) {
        for (let i = 0; i < allRoutes[actualRoute].length; i++) {
          const route = Object.assign({}, allRoutes[actualRoute][i])
          route.to = { name: route.name, params: this.$router.currentRoute.params }
          if (!route.allowedRoutes) {
            toReturn.push(route)
          } else {
            if (route.allowedRoutes.includes(this.$router.currentRoute.name)) {
              route.display = typeof route.display === 'function' ? route.display.call(this, this.$router.currentRoute.params) : route.display
              if (route.display !== false) {
                toReturn.push(route)
              } else {
                this.$router.push({ name: '404' })
              }
            }
          }
        }
      }
      this.actualRoutes = toReturn
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#header {
  height: 60px;
  background-color: $color;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);

  nav {
    overflow-x: auto;
    height: 100%;
    width: 100%;
    ul {
      height: 100%;
      display: flex;
      flex-direction: row;
      li{
        height: 100%;
      }
    }
    .link {
      font-size: 1.2em;
      color: white;
      display: block;
      height: 100%;
      transition: 200ms background-color ease;
      line-height: 60px;
      padding: 0 30px;
      white-space: nowrap;
      &:hover, &.router-link-exact-active {
        background-color: $colorhover;
        text-decoration: none;
      }
    }
  }
}

</style>

<template>
  <div id="sidebar">
    <nav id="side-nav cw">
      <ul>
        <li><router-link tag="a" class="link rw aw" to="/home"><i class="fas fa-home r"/>Accueil</router-link></li>
        <li><router-link tag="a" class="link rw aw" to="/commands"><i class="fas fa-shopping-basket r"/>Commandes</router-link></li>
        <li><router-link tag="a" class="link rw aw" to="/products"><i class="fas fa-tags r"/>Produits</router-link></li>
        <li><router-link tag="a" class="link rw aw" to="/users"><i class="fas fa-users r"/>Utilisateurs</router-link></li>
        <li><router-link tag="a" class="link rw aw" to="/stats"><i class="fas fa-chart-line r"/>Statistiques</router-link></li>
        <li><router-link tag="a" class="link rw aw" to="/content"><i class="fas fa-font r"/>Contenu</router-link></li>
        <li><router-link tag="a" class="link rw aw" to="/settings"><i class="fas fa-cogs r"/>Paramètres</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Sidebar'
}

</script>

<style scoped lang="scss">
  #sidebar {
    box-sizing: border-box;
    background-color: $black;
    min-height: 100%;

    nav {
      ul {
        li {
          color: white;
          list-style-type: none;
          .link {
            font-size: 1.2em;
            height: 60px;
            box-sizing: border-box;
            color: white;
            padding-right: 40px;
            padding-left: 20px;
            &:hover, &.router-link-active {
              text-decoration: none;
              background-color: $lightblack;
            }
          }
        }
      }
    }
  }
</style>

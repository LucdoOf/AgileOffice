<template>
  <div id="sidebar">
    <nav id="side-nav cw">
      <ul>
        <li><a class="link rw aw" @click="this.showSearchModal"><i class="fas fa-search r"></i>
          <span class="d-none d-md-inline">Rechercher</span></a>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/home">
          <i class="fas fa-home r"/><span class="d-none d-md-inline">Accueil</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/commands">
          <i class="fas fa-shopping-basket r"/><span class="d-none d-md-inline">Commandes</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/products">
          <i class="fas fa-tags r"/><span class="d-none d-md-inline">Produits</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/users">
          <i class="fas fa-users r"/><span class="d-none d-md-inline">Utilisateurs</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/transactions">
          <i class="fas fa-credit-card r"/><span class="d-none d-md-inline">Transactions</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/stats">
          <i class="fas fa-chart-line r"/><span class="d-none d-md-inline">Statistiques</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/content">
          <i class="fas fa-font r"/><span class="d-none d-md-inline">Contenu</span></router-link>
        </li>
        <li><router-link tag="a" class="link rw aw" to="/settings">
          <i class="fas fa-cogs r"/><span class="d-none d-md-inline">Paramètres</span></router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import SearchModal from '../modals/SearchModal'

export default {
  name: 'Sidebar',
  methods: {
    showSearchModal () {
      this.$modal.show(SearchModal, {}, { maxHeight: 1000 })
    }
  }
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
            @include media-breakpoint-down(sm) {
              padding-right: 20px;
              i {
                margin-right: 0 !important;
              }
            }
          }
        }
      }
    }
  }
</style>

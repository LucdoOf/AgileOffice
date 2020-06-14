const state = {
  headerRoutes: {
    home: [
      {
        name: 'home',
        display: 'Résumé'
      }
    ],
    commands: [
      {
        name: 'commands',
        display: 'Récentes'
      },
      {
        name: 'command',
        display (params) {
          const command = this.$store.getters.getCommand(params.id)
          if (!command) return false
          else return command.reference
        },
        allowedRoutes: ['command']
      }
    ],
    products: [
      {
        display: 'Tout les produits',
        name: 'products'
      },
      {
        name: 'product',
        display (params) {
          const product = this.$store.getters.getProduct(params.id)
          if (!product) return false
          else return product.reference
        },
        allowedRoutes: ['product', 'productCommands']
      },
      {
        name: 'productCommands',
        display: 'Commandes liées',
        allowedRoutes: ['product', 'productCommands']
      }
    ],
    users: [
      {
        display: 'Utilisateurs inscrits',
        name: 'users'
      },
      {
        name: 'user',
        display (params) {
          const user = this.$store.getters.getUser(params.id)
          if (!user) return false
          else return user.reference
        },
        allowedRoutes: ['user']
      }
    ],
    stats: [
      {
        display: 'Globales',
        name: 'stats'
      },
      {
        display: 'Commandes',
        name: 'commandsStats'
      },
      {
        display: 'Produits',
        name: 'productsStats'
      },
      {
        display: 'Utilisateurs',
        name: 'usersStats'
      }
    ]
  }
}

const getters = {
  getHeaderRoutes: (state) => state.headerRoutes
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}

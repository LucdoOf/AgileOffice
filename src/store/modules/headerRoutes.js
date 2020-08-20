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
        name: 'createCommand',
        display: 'Créer une commande'
      },
      {
        name: 'command',
        display (params) {
          const command = this.$store.getters.getCommand(params.id)
          if (!command) return false
          else return command.reference
        },
        allowedRoutes: ['command', 'commandShipping']
      },
      {
        name: 'commandShipping',
        display: 'Livraison',
        allowedRoutes: ['command', 'commandShipping']
      }
    ],
    products: [
      {
        display: 'Tout les produits',
        name: 'products'
      },
      {
        name: 'categories',
        display: 'Catégories'
      },
      {
        name: 'category',
        display (params) {
          const category = this.$store.getters.getCategory(params.id)
          if (!category) return false
          else return category.name
        },
        allowedRoutes: ['category']
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
      },
      {
        display: 'Visites',
        name: 'visits'
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
    ],
    content: [
      {
        display: 'Contenu global',
        name: 'content'
      },
      {
        name: 'page',
        display (params) {
          const page = this.$store.getters.getPage(params.id)
          if (!page) return false
          else return page.name
        },
        allowedRoutes: ['page']
      }
    ],
    transactions: [
      {
        display: 'Toutes les transactions',
        name: 'transactions'
      },
      {
        name: 'transaction',
        display (params) {
          const transaction = this.$store.getters.getActualTransaction
          if (!transaction) return false
          else return transaction.reference
        },
        allowedRoutes: ['transaction']
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Commands from '../views/commands/Commands'
import Products from '../views/products/Products'
import Product from '../views/products/Product'
import NotFound from '../views/errors/NotFound'
import Command from '../views/commands/Command'
import ProductCommands from '../views/products/ProductCommands'
import Users from '../views/users/Users'
import User from '../views/users/User'
import Login from '../components/Login'
import Manager from '../views/Manager'
import GlobalStats from '../views/stats/GlobalStats'
import CommandsStats from '../views/stats/CommandsStats'
import ProductsStats from '../views/stats/ProductsStats'
import UsersStats from '../views/stats/UsersStats'
import CreateCommand from '../views/commands/CreateCommand'
import CommandShipping from '../views/commands/CommandShipping'
import Content from '../views/content/Content'
import Page from '../views/content/Page'
import Categories from '../views/products/Categories'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manager',
    component: Manager,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/commands',
        name: 'commands',
        component: Commands
      },
      {
        path: '/products',
        name: 'products',
        component: Products
      },
      {
        path: '/products/:id',
        name: 'product',
        component: Product,
        props: true
      },
      {
        path: '/commands/:id',
        name: 'command',
        component: Command,
        props: true
      },
      {
        path: '/products/:id/commands',
        name: 'productCommands',
        component: ProductCommands,
        props: true
      },
      {
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/users/:id',
        name: 'user',
        component: User,
        props: true
      },
      {
        path: 'stats',
        name: 'stats',
        component: GlobalStats
      },
      {
        path: 'stats/commands',
        name: 'commandsStats',
        component: CommandsStats
      },
      {
        path: 'stats/products',
        name: 'productsStats',
        component: ProductsStats
      },
      {
        path: 'stats/users',
        name: 'usersStats',
        component: UsersStats
      },
      {
        path: 'commands/create',
        name: 'createCommand',
        component: CreateCommand
      },
      {
        path: 'commands/:id/shipping',
        name: 'commandShipping',
        component: CommandShipping,
        props: true
      },
      {
        path: 'content',
        name: 'content',
        component: Content
      },
      {
        path: 'content/pages/:id',
        name: 'page',
        component: Page,
        props: true
      },
      {
        path: 'products/categories',
        name: 'categories',
        component: Categories
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home')
  } else {
    if (!to.matched.length) {
      next('/404')
    } else {
      next()
    }
  }
})

export default router

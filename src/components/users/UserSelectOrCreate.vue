<template>
  <div class="box">
    <div class="box-title">
      <span class="title">Choisissez un utilisateur ou créez en un</span>
    </div>
    <div class="box-content-group">
      <div class="box-content" :class="{ 'gray' : select === false }">
        <div class="field">
          <div class="label">Choisissez un utilisateur</div>
          <div class="value"><UserSelector ref='selector' @update="this.updateSelector"/></div>
        </div>
      </div>
      <div class="box-content" :class="{ 'gray' : select === true }">
        <div class="field">
          <div class="label">Nom</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="lastname"></div>
        </div>
        <div class="field">
          <div class="label">Prénom</div>
          <div class="value"><input type="text" class="input" :disabled="select === true" v-model="firstname"></div>
        </div>
        <div class="field">
          <div class="label">Mail</div>
          <div class="value"><input type="email" class="input" :disabled="select === true" v-model="mail"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSelector from './UserSelector'
export default {
  name: 'UserSelectOrCreate',
  components: { UserSelector },
  data () {
    return {
      select: false,
      firstname: '',
      lastname: '',
      mail: ''
    }
  },
  methods: {
    updateSelector ({ user }) {
      this.select = user !== null
      this.$emit('selectUpdate', { user: user })
    },
    getFinalUser () {
      if (this.select === true) return this.$refs.selector.user
      return this.$data
    }
  }
}
</script>

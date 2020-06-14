<template>
  <div id="login" class="box">
    <div class="box-title"><span class="title">Veuillez rentrer vos identifiants</span></div>
    <div class="box-content">
      <div class="field">
        <div class="label">Utilisateur</div>
        <div class="value"><input type="text" class="input" v-model="name"></div>
      </div>
      <div class="field">
        <div class="label">Mot de passe</div>
        <div class="value"><input type="password" class="input" v-model="password"></div>
      </div>
    </div>
    <div class="box-footer">
      <div class="button-group">
        <a class="button cta" @click="this.auth">Connection</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #login {
    margin: auto;
  }
</style>

<script>
export default {
  name: 'Login',
  props: ['next'],
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    auth: function () {
      this.$app.request('/auth', 'post', this.$data).then((response) => {
        if (this.$app.treatResponse(response, 'Connection')) {
          this.$store.dispatch('setConnectedUser', response.data.data).then(() => {
            this.$router.push(this.next ?? '/')
          })
        }
      })
    }
  }
}
</script>

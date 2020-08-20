<template>
  <fieldset>
    <div class="field">
      <div class="label">Destinataire</div>
      <div class="value">
        <input type="text" class="input" placeholder="user@gmail.com" v-model="targetClone">
      </div>
    </div>
    <div class="field">
      <div class="label">Sujet</div>
      <div class="value">
        <input type="text" class="input" placeholder="Suite à votre commande CMD_XXXX" v-model="subject">
      </div>
    </div>
    <div class="field">
      <div class="label">Contenu</div>
      <div class="value">
        <textarea class="input" v-model="content"></textarea>
      </div>
    </div>
    <input type="submit" class="button cta" value="Envoyer" @click="this.sendMail">
  </fieldset>
</template>

<script>
export default {
  name: 'WriteMailModal',
  props: {
    target: {
      type: String,
      default: ''
    },
    user_id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      subject: '',
      content: '',
      targetClone: ''
    }
  },
  mounted () {
    this.targetClone = this.target
  },
  methods: {
    sendMail () {
      const toSend = {
        target: this.targetClone,
        subject: this.subject,
        content: this.content,
        user_id: this.user_id
      }
      this.$app.request('/mails/send', 'put', toSend).then(response => {
        if (this.$app.treatResponse(response, 'Rédaction du mail')) {
          this.$emit('close')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

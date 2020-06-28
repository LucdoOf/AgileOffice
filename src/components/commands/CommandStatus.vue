<template>
  <div class="box">
    <div class="box-title">
      <span class="title">Statut de la commande</span>
    </div>
    <div class="box-content">
      <div class="field-group">
        <div class="field command-status-field" v-for="field in this.$app.allCommandsStatus()" :key="field.value" :class="{ active: status === field.value }">
          <div class="label nowrap"><label :style="'color: ' + field.color" :for="'command-status-' + field.value"><i :class="field.icon" class="r"/> {{ field.label }}</label></div>
          <div class="value">
            <input type="radio" class="radio" v-model="status" :id="'command-status-' + field.value" name="status" :value="field.value"/>
          </div>
        </div>
      </div>
    </div>
    <div class="box-footer">
      <div class="button-group">
        <a class="button red" @click="this.onDelete">Supprimer la commande</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommandStatus',
  props: ['command'],
  data () {
    return {
      status: 'draft',
      dontTriggerWatch: true
    }
  },
  methods: {
    ...mapActions(['deleteCommand']),
    onDelete () {
      this.$modal.show('dialog', {
        title: 'Supprimer la commande',
        text: 'Êtes-vous sur ? Cette action est irreversible, si vous souhaitez simplement annuler la commande, changez son status.',
        buttons: [
          {
            title: 'Supprimer la commande',
            handler: () => {
              this.deleteCommand(this.command.id).then(response => {
                this.$modal.hide('dialog')
                if (response.status === 200) this.$router.push('/commands')
              })
            },
            class: 'button red'
          },
          {
            title: 'Annuler',
            default: true,
            class: 'button'
          }
        ]
      })
    }
  },
  created () {
    this.status = this.command.status
  },
  watch: {
    status: function (value, oldValue) {
      if (this.dontTriggerWatch === true) {
        this.dontTriggerWatch = false
        return
      }
      this.$app.request('/commands/' + this.command.id + '/status/update', 'post', { status: this.status }).then(response => {
        if (!this.$app.treatResponse(response, 'Commande ' + this.command.reference)) {
          this.dontTriggerWatch = true
          this.status = oldValue
        } else {
          this.command.status = this.status
          this.$emit('update')
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .command-status-field {
    &:not(.active):not(:hover) label {
      color: $darkgray !important;
    }
    label {
      transition: 400ms all ease;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="box no-padding">
    <div class="box-title"><span class="title">Historique de la commande</span></div>
    <div class="box-content">
      <Table :tableData="this.getFormatedHistory"
             :columns="{'history_date':'Date de modification','old_status':'Ancien status','new_status':'Nouveau status'}"/>
    </div>
  </div>
</template>

<script>
import Table from '../Table'

export default {
  name: 'CommandHistory',
  components: { Table },
  props: ['command'],
  data () {
    return {
      history: null
    }
  },
  mounted () {
    this.updateHistory()
  },
  methods: {
    updateHistory () {
      this.$app.request('/commands/' + this.command.id + '/history').then(response => {
        if (this.$app.treatResponse(response)) {
          this.history = response.data
        }
      })
    }
  },
  computed: {
    getFormatedHistory: function () {
      const toReturn = []
      if (!this.history) return toReturn
      for (let i = 0; i < this.history.length; i++) {
        const version = Object.assign({}, this.history[i])
        version.id = version.additional_data.history_id
        version.history_date = this.$app.formatDate(version.additional_data.history_date_stamp)
        version.history_date_value = version.additional_data.history_date_stamp
        version.old_status = this.$app.formatCommandStatus(version.status)
        version.new_status = this.$app.formatCommandStatus((i === 0 ? this.command.status : this.history[i - 1].status))
        toReturn.push(version)
      }
      return toReturn
    }
  }
}
</script>

<template>
  <div class="box">
    <div class="box-title">
      <span class="title">Suivi de livraison</span>
    </div>
    <div class="box-content">
      <div class="field">
        <div class="label">Transporteur</div>
        <div class="value rw aw jw">
          {{ command.transporter.name + ' (' + command.transporter.identifier + ')' }}
          <img id="transporter-logo" :src="require('@/assets/images/logos/' + command.transporter.identifier + '-logo.png')"/>
        </div>
      </div>
      <div class="field">
        <div class="label">Numéro de suivi</div>
        <div class="value rw aw jw">
          <input type="text" placeholder="12345689" v-model="tracking_number" @keyup.enter="this.saveTrackingNumber"/>
          <i class="fas fa-save l green clickable" @click="this.saveTrackingNumber"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommandTracking',
  props: ['command'],
  data () {
    return {
      tracking_number: null
    }
  },
  methods: {
    saveTrackingNumber () {
      this.$app.request('/commands/' + this.command.id + '/tracking/update', 'post', { tracking_number: this.tracking_number }).then(response => {
        this.$app.treatResponse(response, 'Numéro de suivi')
      })
    }
  },
  mounted () {
    this.tracking_number = this.command.tracking_number
  }
}
</script>

<style>
  #transporter-logo {
    height: 20px;
    width: auto;
    margin-left: 10px;
  }
</style>

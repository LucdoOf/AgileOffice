<template>
  <multiselect v-model="transporter"
               :options="this.getAvailableTransporters"
               track-by="identifier"
               :showLabels="false"
               :custom-label="(option) => option"
               placeholder="Transporteur">
    <template slot="singleLabel" slot-scope="props">
      <div v-html="$app.formatTransporter(props.option)"/>
    </template>
    <template slot="option" slot-scope="props">
      <div v-html="$app.formatTransporter(props.option)"/>
    </template>
    <template slot="noResult">
      Aucun transporteur
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'TransporterSelector',
  data () {
    return {
      transporter: null
    }
  },
  methods: {
    getTransporter () {
      return this.transporter
    }
  }
}
</script>

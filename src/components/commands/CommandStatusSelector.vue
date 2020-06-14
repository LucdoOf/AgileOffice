<template>
  <multiselect v-model="filter_status"
               :options="this.$app.allCommandsStatus()"
               track-by="value"
               :showLabels="false"
               style="width: 300px"
               :custom-label="(option) => option.label"
               placeholder="Status de la commande">
    <template slot="singleLabel" slot-scope="props">
      <div v-html="$app.formatCommandStatus(props.option.value)"/>
    </template>
    <template slot="option" slot-scope="props">
      <div v-html="$app.formatCommandStatus(props.option.value)"/>
    </template>
    <template slot="noResult">
      Aucun résultat
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'CommandStatusSelector',
  data () {
    return {
      filter_status: null
    }
  },
  watch: {
    filter_status (value, oldValue) {
      this.$emit('update', { filter: value })
    }
  }
}
</script>

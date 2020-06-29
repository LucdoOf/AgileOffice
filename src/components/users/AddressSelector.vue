<template>
  <multiselect v-model="address"
               :options="this.user ? this.user.linked_addresses : []"
               track-by="id"
               :showLabels="false"
               :custom-label="(address) => address.lastname + ' ' + address.firstname + ' ' + address.address"
               :disabled="this.disabled"
               placeholder="Adresse">
    <template slot="singleLabel" slot-scope="props">
      {{ props.option.lastname + ' ' + props.option.firstname + ' ' + props.option.address }}
    </template>
    <template slot="option" slot-scope="props">
      {{ props.option.lastname + ' ' + props.option.firstname + ' ' + props.option.address  }}
    </template>
    <template slot="noResult">
      Aucun résultat
    </template>
    <template slot="noOptions">
      Aucune adresse connue
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'AddressSelector',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object
    }
  },
  data () {
    return {
      address: null
    }
  },
  watch: {
    address (value, oldValue) {
      this.$emit('update', { address: value })
    }
  }
}
</script>

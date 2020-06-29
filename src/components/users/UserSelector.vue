<template>
  <multiselect v-model="user"
               :options="this.getUsers"
               track-by="id"
               :showLabels="false"
               :custom-label="(user) => user.lastname + ' ' + user.firstname"
               :disabled="this.disabled"
               placeholder="Utilisateur">
    <template slot="singleLabel" slot-scope="props">
      {{ props.option.lastname + ' ' + props.option.firstname + ' (' + props.option.reference + ')' }}
    </template>
    <template slot="option" slot-scope="props">
      {{ props.option.lastname + ' ' + props.option.firstname+ ' (' + props.option.reference + ')'  }}
    </template>
    <template slot="noResult">
      Aucun résultat
    </template>
  </multiselect>
</template>

<script>
export default {
  name: 'UserSelector',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: null
    }
  },
  watch: {
    user (value, oldValue) {
      this.$emit('update', { user: value })
    }
  }
}
</script>

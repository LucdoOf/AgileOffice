<template>
  <div class="box small">
    <div class="box-content">
      <div class="field">
        <div class="label nowrap">
          Nombre de produits moyens {{ this.distinct ? 'distints' : '' }} par panier
        </div>
        <div class="value xl">{{ this.$app.parseDecimal(averageProducts) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AverageProductsByBasket',
  props: {
    distinct: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    averageProducts () {
      const commands = this.getCommands
      return commands.reduce((total, obj) => {
        return total + obj.basket.entries.reduce((t, o) => t + (this.distinct ? 1 : parseInt(o.quantity)), 0)
      }, 0) / commands.length
    }
  }
}
</script>

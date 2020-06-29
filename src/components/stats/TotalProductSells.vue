<template>
  <div class="box small">
    <div class="box-content">
      <div class="field">
        <div class="label nowrap">
          Total produits vendus
        </div>
        <div class="value xl">{{ totalSells }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TotalProductSells',
  computed: {
    totalSells () {
      const commands = this.getCommands
      return commands.reduce((total, obj) => {
        return total + obj.basket.entries.reduce((t, o) => t + parseInt(o.quantity), 0)
      }, 0)
    }
  }
}
</script>

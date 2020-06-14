<template>
  <div class="chart">
    <VueApexCharts :type="chart" :options="options" :series="series" :height="height"/>
  </div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',
  components: {
    VueApexCharts
  },
  props: {
    chart: {
      type: String,
      default: 'bar'
    },
    xaxis: {
      type: String,
      default: 'datetime'
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    series: {
      type: Array,
      default: () => {
        return []
      }
    },
    labels: {
      type: [Object, Array],
      default: () => {
        return []
      }
    },
    dataLabels: {
      type: Object,
      default: () => {
        return {}
      }
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  created () {
    this.options.xaxis.type = this.xaxis
    this.options.legend.show = this.showLegend
    this.options.labels = this.labels
    this.options.dataLabels = this.dataLabels
    console.log(this.options)
  },
  data: () => {
    return {
      options: {
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeUTC: false
          }
        },
        colors: ['#696bff', '#60E1E0', '#484349', '#F7F0F0', '#F72585'],
        legend: {
          floating: false
        }
      }
    }
  }
}

</script>

<style lang="scss">
  .apexcharts-legend-series {
    margin-top: 35px !important;
  }
</style>

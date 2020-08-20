<template>
  <div id="page">
    <div class="row">
      <Translations class="col-12 col-lg-6" :initial-translations="this.getPageTranslations(this.page.slug)">Traductions {{ this.page.name }}</Translations>
    </div>
  </div>
</template>

<script>
import Translations from '../../components/content/Translations'
import store from '../../store'
export default {
  name: 'Page',
  components: { Translations },
  props: ['id'],
  computed: {
    page () {
      return this.$store.getters.getPage(this.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('fetchPages').finally(() => {
      next()
    })
  }
}
</script>

<template>
  <div id="content">
    <div class="row">
      <PagesTable class="col-12 col-lg-6 wr"/>
      <Translations class="col-12 col-lg-6" :initial-translations="this.getGlobalTranslations">Traductions globales</Translations>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import PagesTable from '../../components/content/PagesTable'
import Translations from '../../components/content/Translations'
export default {
  name: 'Content',
  components: { Translations, PagesTable },
  beforeRouteEnter (to, route, next) {
    store.dispatch('fetchPages').finally(() => {
      store.dispatch('fetchTranslations').finally(() => {
        next()
      })
    })
  }
}
</script>

<template>
  <div id="content">
    <div class="row">
      <Pages class="w-s6 wr"/>
      <Translations class="w-s6" :initial-translations="this.getGlobalTranslations">Traductions globales</Translations>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import Pages from './Pages'
import Translations from '../../components/content/Translations'
export default {
  name: 'Content',
  components: { Translations, Pages },
  beforeRouteEnter (to, route, next) {
    store.dispatch('fetchPages').finally(() => {
      store.dispatch('fetchTranslations').finally(() => {
        next()
      })
    })
  }
}
</script>

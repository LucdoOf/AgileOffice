<template>
  <div class="box">
    <div class="box-title">
      <span class="title"><slot/></span>
      <div class="box-actions">
        <a class="link" @click="refreshTranslations">Générer les traductions</a>
      </div>
    </div>
    <div class="box-content-group">
      <div class="box-content gray" v-if="Object.keys(this.translations).length === 0">
        <span class="box-message">Aucune traduction connue</span>
      </div>
      <div class="box-content" v-else>
        <div class="field" v-for="(translation, id) in translations" :key="id">
          <div class="label">{{ id }}</div>
          <div class="value rw aw jw">
            <input class="input" @keyup.enter="saveTranslation(id)" v-model="translations[id]"/>
            <i class="fas fa-save l green clickable" @click="saveTranslation(id)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Translations',
  data () {
    return {
      translations: {}
    }
  },
  props: {
    initialTranslations: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  beforeMount () {
    for (let translation in Array.from(this.initialTranslations)) {
      translation = this.initialTranslations[translation]
      this.translations[translation.id] = translation.translation
    }
  },
  methods: {
    saveTranslation (translationKey) {
      const value = this.translations[translationKey]
      this.$app.request('/translations/fr_FR/' + translationKey + '/update', 'post', { value: value }).then(response => {
        this.$app.treatResponse(response, 'Traduction ' + translationKey)
      })
    },
    refreshTranslations () {
      this.$app.request('/translations/fr_FR/refresh', 'post').then(response => {
        this.$app.treatResponse(response, 'Traductions')
      })
    }
  }
}
</script>

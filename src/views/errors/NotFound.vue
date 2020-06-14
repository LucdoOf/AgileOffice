<template>
  <div class="row">
    <div class="box w-s12">
      <div class="box-title"><span class="title">Erreur 404</span></div>
      <div class="box-content">
        <span class="box-message">Il semblerait que vous ne devriez pas être ici !</span>
      </div>
      <div class="box-footer">
        <div class="button-group center">
          <a class="button cta" @click="$router.push('/')">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

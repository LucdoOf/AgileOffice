<template>
  <div v-html="mail.content"></div>
</template>

<script>
export default {
  name: 'MailContentModal',
  props: ['mail']
}
</script>

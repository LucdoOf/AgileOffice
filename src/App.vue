<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <notifications group="notifications" position="bottom right"/>
    <modals-container/>
    <v-dialog />
  </div>
</template>

<style lang="scss">
html, body {
  font-family: 'Open-Sans', sans-serif;
  margin: 0;
  height: 100%;
  font-size: 12px;
}

#app {
  font-family: 'Open-Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; background-color: $backgroundgray;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.slide-enter-active,
.slide-leave-active {
  transition-duration: 0.25s;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.slide-enter,
.slide-leave-active {
  opacity: 0;
  transform: translateX(-20px);
}

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

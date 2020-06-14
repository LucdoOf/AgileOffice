<template>
  <div id="app">
    <router-view/>
    <notifications group="notifications" position="bottom right"/>
    <modals-container/>
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
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

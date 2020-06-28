<template>
  <div id="manager">
    <Sidebar/>
    <div id="middle">
      <Header/>
      <transition name="slide" mode="out-in">
        <router-view id="content"/>
      </transition>
      <notifications group="notifications" position="bottom right"/>
      <modals-container/>
    </div>
  </div>
</template>

<style lang="scss">
#manager {
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;

  #middle {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    flex: 1 auto;

    #content {
      position: relative;
      padding: 20px 10px;
      overflow: auto;
      box-sizing: border-box;
      height: calc(100% - 60px);
      max-height: 100%;
    }
  }
}
</style>

<script>

import Sidebar from '../components/layouts/Sidebar'
import Header from '../components/layouts/Header'

export default {
  components: {
    Header,
    Sidebar
  }
}

</script>

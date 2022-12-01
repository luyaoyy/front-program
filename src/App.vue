<template>
  <div id="app">
    <keep-alive include="UserHomePage">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',

}
</script>

<style>
body{
  padding: 0;
  margin: 0 !important;
}
</style>

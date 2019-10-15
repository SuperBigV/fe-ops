<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
// <script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    pathName() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions([
      'getUserName',
      'getApprovers',
      'getPdls',
      'getGroup'
    ]),
  },
  created() {
    this.getUserName();
    this.getApprovers();
    this.getPdls();
    this.getGroup();
  },
};
// </script>
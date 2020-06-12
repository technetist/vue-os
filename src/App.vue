<template>
  <div id="app" class="flex flex-col h-screen">
    <nav class="py-3 bg-indigo-800 text-white" v-if="!$route.meta.noNav">
      <router-link to="/" class="px-5 cursor-pointer">Home</router-link>
      <router-link v-if="user.loggedIn" to="/desktop"
                   class="px-5 cursor-pointer">Desktop</router-link>
      <router-link v-if="!user.loggedIn" to="/auth"
                   class="px-5 cursor-pointer">Login</router-link>
      <a v-else class="px-5 cursor-pointer" @click.prevent="signOut">Sign out</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { mapGetters } from 'vuex';

  export default {
    name: 'App',
    computed: {
      ...mapGetters({
        user: 'user',
      }),
    },
    methods: {
      signOut() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            if (this.$route.path !== '/auth') {
              this.$router.replace({
                name: 'Authentication',
              });
            }
          });
      },
    },
  };
</script>

<style lang="scss">
</style>

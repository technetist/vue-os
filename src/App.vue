<template>
  <div id="app" class="flex flex-col h-screen">
    <nav class="py-3 bg-indigo-800 text-white">
      <router-link to="/" class="px-5">Home</router-link>
      <router-link v-if="!user.loggedIn" to="/auth" class="px-5">Login</router-link>
      <a v-else class="px-5" @click.prevent="signOut">Sign out</a>
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
            this.$router.replace({
              name: 'Authentication',
            });
          });
      },
    },
  };
</script>

<style lang="scss">
</style>

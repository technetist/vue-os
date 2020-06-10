<template>
  <div>
    <h2>Desktop</h2>
    <template v-if="user.loggedIn">
      <div class="alert alert-success" role="alert">
        You are logged in
      </div>
    </template>
  </div>
</template>

<style></style>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        user: 'user',
      }),
    },
  };
</script>

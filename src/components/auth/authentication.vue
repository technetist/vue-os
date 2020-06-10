<template>
  <div>
    <Login v-if="isLoggingIn"/>
    <Registration v-else/>
  </div>
</template>

<script>
  import EventBus from '../../EventBus';
  import Registration from './includes/registration.vue';
  import Login from './includes/login.vue';

  export default {
    name: 'App',
    data() {
      return {
        isLoggingIn: true,
      };
    },
    components: {
      Registration,
      Login,
    },
    created() {
      EventBus.$on('switch_auth_method', (view) => {
        this.isLoggingIn = view === 'login';
      });
    },
  };
</script>

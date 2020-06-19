<template>
  <div>
    <div id="background-container"
         :style="`background-image:url(${backgroundImage})`"
         class="h-screen w-full bg-no-repeat bg-cover bg-center"
         @contextmenu.prevent="$refs.menu.open">
    </div>
    <vue-context ref="menu">
      <li>
        <a href="#" @click.prevent="getRandomBackground">Change Background</a>
      </li>
    </vue-context>
  </div>
</template>

<style lang="postcss" scoped>
</style>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  import { VueContext } from 'vue-context';

  export default {
    components: {
      VueContext,
    },
    data() {
      return {
        backgroundImage: '',
      };
    },
    methods: {
      getRandomBackground() {
        axios
          .get(`https://api.unsplash.com/photos/random?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`)
          .then((result) => {
            this.backgroundImage = `${result.data.urls.raw}&w=1500&dpr=2`;
          });
      },
    },
    created() {
      this.getRandomBackground();
    },
    computed: {
      ...mapGetters({
        user: 'user',
      }),
    },
  };
</script>

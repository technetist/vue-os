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
        <a href="#" @click.prevent="saveBackground">Save Background</a>
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
  import firebase, { auth } from '../firebase';

  const db = firebase.firestore();

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
      saveBackground() {
        db.collection(`users/${auth.currentUser.uid}`).doc('user-settings').set({
          'background-image': this.backgroundImage,
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

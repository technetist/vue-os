<template>
  <div id="passwordless"
       class="flex items-center justify-center h-screen
    bg-teal-300 flex-col">
    <div class="bg-white text-black font-normal rounded-lg shadow-lg p-10
        flex justify-center flex-col items-center">
      <h1>Logging you in...</h1>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import Swal from 'sweetalert2';
  import store from '../../store';

  export default {
    data() {
      return {
        showAskForMail: false,
        email: null,
      };
    },
    created() {
      const url = window.location.href;
      this.email = store.state.signinEmail;
      if (firebase.auth()
        .isSignInWithEmailLink(url) && this.email) {
        this.continueWithSignIn();
      } else {
        this.showAskForMail = true;
      }
    },
    methods: {
      continueWithSignIn() {
        firebase.auth()
          .signInWithEmailLink(this.email, window.location.href)
          .then(() => {
            this.$router.replace({ name: 'Desktop' });
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error!',
              text: err.message,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          });
      },
    },
    watch: {
      showAskForMail() {
        if (this.showAskForMail) {
          (async () => {
            const { value: email } = await Swal.fire({
              title: 'Continue sign in:\n Enter your email address',
              input: 'email',
              inputPlaceholder: 'john@example.com',
            });

            if (email) {
              this.email = email;
              this.continueWithSignIn();
            }
          })();
        }
      },
    },
  };
</script>

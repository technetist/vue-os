<template>
  <div id="login" class="flex items-center justify-center h-screen
                         bg-teal-300 flex-col">
    <div class="bg-indigo-800 text-white font-bold rounded-lg shadow-lg p-10
                flex justify-center flex-col items-center">
      <div v-if="error" class="text-sm text-red-400">{{error}}</div>
      <form action="#" @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                   leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email" value
            required
            autofocus
            v-model="form.email">
        </div>

        <div class="mb-4">
          <label for="password" class="block text-white text-sm font-bold mb-2">Password</label>

          <div class="col-md-6">
            <input
              id="password"
              type="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                     leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              required
              placeholder="Password"
              v-model="form.password"
            />
          </div>
        </div>

        <div class="flex flex-col items-center mt-5">
          <button class="bg-teal-500 hover:bg-teal-700 mb-3
                         text-white font-bold py-2 px-4 rounded
                         focus:outline-none focus:shadow-outline"
                  type="submit">
            Sign In
          </button>
          <a class="block align-baseline
                    font-bold text-sm text-blue-300 hover:text-blue-500 my-2"
             @click.prevent="switchAuthMethod()">
            Need an account?
          </a>
          <a class="block align-baseline
                    font-bold text-sm text-blue-300 hover:text-blue-500"
             @click.prevent="forgotPassword">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
    <div><p class="text-white">Image by <a
      href="https://pixabay.com/users/AnnaliseArt-7089643/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5019641">Annalise
      Batista</a> from <a
      href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5019641">Pixabay</a>
    </p></div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import Swal from 'sweetalert2';
  import EventBus from '../../../EventBus';

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        error: null,
      };
    },
    methods: {
      submit() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            this.$router.replace({ name: 'Desktop' });
          })
          .catch((err) => {
            this.error = err.message;
          });
      },
      forgotPassword() {
        (async () => {
          const { value: email } = await Swal.fire({
            title: 'Enter your email address',
            input: 'email',
            inputPlaceholder: 'john@example.com',
          });

          if (email) {
            this.form.email = email;
            firebase
              .auth()
              .sendPasswordResetEmail(email)
              .then(() => {
                Swal.fire(`Sent an email to: ${email}`);
              })
              .catch((error) => {
                Swal.fire({
                  title: 'Error!',
                  text: error,
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              });
          }
        })();
      },
      switchAuthMethod() {
        EventBus.$emit('switch_auth_method', 'register');
      },
    },
  };
</script>

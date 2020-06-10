<template>
  <div>
    <h1>Error</h1>
    <button @click="myValue"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      myValue() {
        // eslint-disable-next-line no-undef
        return a - b;
      },
    },
  };
</script>

<template>
  <div class="flex w-80 flex-col text-center">
    <h1 class="font-bold">Renderer to Main (two-way)</h1>
    <div class="my-2 flex justify-center">
      <div class="mr-3 flex flex-shrink-0">
        <button
          :disabled="pinging"
          @click="ping"
          type="submit"
          class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-11 py-1.5 text-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          Ping
        </button>
      </div>
      <p v-if="!response" class="flex w-full items-center text-sm">
        Main is waiting...
      </p>
      <p v-else class="flex w-full items-center text-sm">
        {{ response }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RendererToMain2",
  data() {
    return {
      response: null,
      pinging: false,
    };
  },
  methods: {
    async ping() {
      this.pinging = true;

      this.response = await window.preload.ping();

      setTimeout(() => {
        this.response = null;
        this.pinging = false;
      }, 750);
    },
  },
};
</script>

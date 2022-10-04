<template>
  <div class="flex w-80 flex-col text-center">
    <h1 class="font-bold">Renderer to Main (one-way)</h1>
    <form @submit.prevent="one_way" class="my-2 flex">
      <label for="title" class="sr-only">Title</label>
      <input
        ref="input"
        id="title"
        name="title"
        type="text"
        class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus-visible:outline-none"
        placeholder="Title"
      />
      <div class="mt-3 mt-0 ml-3 flex-shrink-0 rounded-md shadow">
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Change Title
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RendererToMain1",
  methods: {
    one_way(submitEvent) {
      this.$refs.input.focus();
      window.preload.setTitle(submitEvent.target.elements.title.value);
    },
  },
};
</script>

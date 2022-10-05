<template>
  <div class="flex-col text-center">
    <p class="font-bold">Main to Renderer</p>
    <p v-if="!file" class="mt-1">
      Use <span class="font-bold text-indigo-500">⌥ + ⌘ + F</span> to select a
      file
    </p>
    <p v-else class="mt-1">
      Selected file: <span class="font-bold text-indigo-500">{{ file }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "MainToRenderer",
  data() {
    return {
      file: null,
    };
  },
  mounted() {
    // handle reply from the backend
    window.preload.onFileSelected((_event, value) => {
      this.file = value;

      // Optional: returning a reply through callback.
      _event.sender.send("file-displayed", true);
    });
  },
};
</script>

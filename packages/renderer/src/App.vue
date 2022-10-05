<template>
  <div class="flex h-screen flex-col">
    <div class="flex flex-col items-center justify-center border-b-2 py-4">
      <h1 class="text-5xl font-bold text-gray-700">Electron</h1>
      <h3 class="mt-2 text-3xl text-gray-500">
        Inter-Process Communication (IPC) Patterns
      </h3>
    </div>
    <div class="flex w-full flex-grow items-center justify-center">
      <div class="flex w-full flex-grow items-center justify-center">
        <ul role="list" class="w-2/4 divide-y divide-gray-200">
          <ListItem>
            <RendererToMain1 />
          </ListItem>
          <ListItem>
            <RendererToMain2 />
          </ListItem>
          <ListItem>
            <MainToRenderer />
          </ListItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import ListItem from "./components/ListItem.vue";
import RendererToMain1 from "./components/RendererToMain1.vue";
import RendererToMain2 from "./components/RendererToMain2.vue";
import MainToRenderer from "./components/MainToRenderer.vue";
</script>

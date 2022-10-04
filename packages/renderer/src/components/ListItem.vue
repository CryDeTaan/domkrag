<template>
  <li class="py-4">
    <div
      class="flex justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-2 text-gray-600"
    >
      <slot />
    </div>
  </li>
</template>

<script>
export default {
  name: "ListItem",
};
</script>

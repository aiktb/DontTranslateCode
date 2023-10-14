<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  'update:modelValue': [modelValue: boolean];
}>();
</script>

<template>
  <li
    class="group w-full transition-all hover:bg-blue-200 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-sky-400"
  >
    <button
      role="checkbox"
      :aria-checked="props.modelValue"
      class="flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-md px-2 outline outline-2 outline-sky-400 focus-visible:outline-slate-950 dark:focus-visible:outline-slate-50"
      @click="emit('update:modelValue', !props.modelValue)"
    >
      <slot name="default" />
      <div class="relative">
        <div
          :class="props.modelValue ? 'bg-sky-400' : 'bg-gray-400'"
          class="h-3.5 w-12 rounded-full opacity-60 shadow-xl transition-all"
        />
        <div
          :class="
            props.modelValue
              ? 'left-[2.5rem] bg-sky-500 group-hover:outline-sky-600/50'
              : 'left-2.5 bg-slate-400 group-hover:outline-gray-600/50'
          "
          class="absolute top-1/2 h-5 w-5 translate-x-[-50%] translate-y-[-50%] rounded-full shadow-xl transition-all group-hover:outline group-hover:outline-8"
        />
      </div>
    </button>
  </li>
</template>

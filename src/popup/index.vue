<script setup lang="ts">
import AsyncUI from './components/AsyncUI.vue';

import './tailwind.css';
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncUI />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Browser from 'webextension-polyfill';

import Logo from 'data-text:@Assets/logo.svg';

import { Storage } from '@plasmohq/storage';

import { Option } from '~contents/constants';

import MenuItem from './MenuItem.vue';

const storage = new Storage({ area: 'local' });
const preventTranslation = ref<boolean>(await storage.get(Option.preventTranslateCode));
const forceModifyFont = ref<boolean>(await storage.get(Option.forceModifyFont));

watch(preventTranslation, async (newValue) => {
  await storage.set(Option.preventTranslateCode, newValue);
});

watch(forceModifyFont, async (newValue) => {
  await storage.set(Option.forceModifyFont, newValue);
});
</script>

<template>
  <div
    class="flex gap-x-3 whitespace-nowrap bg-slate-200 px-4 py-2 font-mono text-base text-slate-800 dark:bg-slate-900 dark:text-blue-200"
  >
    <header>
      <a
        href="https://github.com/aiktb/DontTranslateCode"
        target="_blank"
        class="flex justify-center text-9xl"
        v-html="Logo"
      />
    </header>
    <main class="flex items-center justify-center py-2">
      <menu class="flex flex-col items-center gap-y-3">
        <h1 class="mb-2 text-lg font-bold text-sky-400">Don't Translate Code!</h1>
        <MenuItem v-model="preventTranslation">
          {{ Browser.i18n.getMessage(Option.preventTranslateCode) }}
        </MenuItem>
        <MenuItem v-model="forceModifyFont">
          {{ Browser.i18n.getMessage(Option.forceModifyFont) }}
        </MenuItem>
      </menu>
    </main>
  </div>
</template>

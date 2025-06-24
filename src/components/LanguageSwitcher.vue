<template>
  <select v-model="localeStore.locale" class="border rounded p-1 text-sm">
    <option value="en">{{ $t('lang.en') }}</option>
    <option value="fa">{{ $t('lang.fa') }}</option>
  </select>
</template>

<script setup lang="ts">
import { useLocaleStore } from '../stores/locale';
const localeStore = useLocaleStore();
</script>

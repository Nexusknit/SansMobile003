<template>
  <div class="mobile-frame" :dir="locale === 'fa' ? 'rtl' : 'ltr'">
    <div class="p-2 flex justify-end">
      <LanguageSwitcher />
    </div>
    <router-view class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
</script>

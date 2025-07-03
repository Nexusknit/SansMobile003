<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">{{ t('login') }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div class="flex items-center border rounded-md p-3 text-lg">
        <span class="mr-2 select-none">+98</span>
        <input
          v-model="phone"
          type="tel"
          placeholder="{{ t('mobile_placeholder') }}"
          class="flex-1 outline-none"
        />
      </div>
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        {{ t('send_code') }}
      </button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../api/ApiService';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const phone = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const { t } = useI18n();

const submit = async () => {
  error.value = null;
  try {
    const normalized = phone.value.replace(/^0/, '');
    await api.sendPhoneNumber(normalized);
    router.push({ path: '/enter-code', query: { phone: normalized } });
  } catch (e) {
    error.value = t('send_code_failed');
  }
};
</script>

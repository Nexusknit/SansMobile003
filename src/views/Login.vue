<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">{{ $t('loginTitle') }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="phone"
        type="tel"
        :placeholder="$t('mobilePlaceholder')"
        class="border rounded-md p-3 text-lg"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        {{ $t('sendCode') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../api/ApiService';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const phone = ref('');
const router = useRouter();

const submit = async () => {
  await api.sendPhoneNumber(phone.value);
  router.push({ path: '/enter-code', query: { phone: phone.value } });
};
</script>

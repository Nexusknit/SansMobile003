<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">{{ $t('enterCodeTitle') }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="code"
        :placeholder="$t('codePlaceholder')"
        class="border rounded-md p-3 text-lg"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        {{ $t('verify') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api/ApiService';
import { useSessionStore } from '../stores/session';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const session = useSessionStore();

const code = ref('');
const phone = route.query.phone as string;

const fetchProfile = async () => {
  const { data } = await api.getProfile(session.token as string);
  session.user = data;
};

const submit = async () => {
  const { data } = await api.verifyCode(phone, code.value);
  session.saveToken(data.token);
  if (data.isNew) {
    router.push('/register');
  } else {
    await fetchProfile();
    router.push('/home');
  }
};
</script>

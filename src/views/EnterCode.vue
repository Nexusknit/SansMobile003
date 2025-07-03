<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">{{ t('enter_code') }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <n-input-otp
        v-model:value="code"
        :length="6"
        placeholder="{{ t('sms_code_placeholder') }}"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        {{ t('verify') }}
      </button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api/ApiService';
import { useSessionStore } from '../stores/session';
import { useI18n } from 'vue-i18n';
import { NInputOtp } from 'naive-ui';

const route = useRoute();
const router = useRouter();
const session = useSessionStore();

const code = ref('');
const error = ref<string | null>(null);
const { t } = useI18n();
const phone = route.query.phone as string;

const fetchProfile = async () => {
  try {
    const { data } = await api.getProfile(session.token as string);
    session.user = data;
  } catch (e) {
    error.value = t('load_profile_failed');
  }
};

const submit = async () => {
  error.value = null;
  try {
    const { data } = await api.verifyCode(phone, code.value);
    session.saveToken(data.token);
    if (data.isNew) {
      router.push('/register');
    } else {
      await fetchProfile();
      router.push('/home');
    }
  } catch (e) {
    error.value = t('verification_failed');
  }
};
</script>

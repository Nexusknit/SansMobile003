<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">{{ t('complete_profile') }}</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="firstName"
        :placeholder="t('first_name')"
        class="border rounded-md p-3 text-lg"
      />
      <input
        v-model="lastName"
        :placeholder="t('last_name')"
        class="border rounded-md p-3 text-lg"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        {{ t('continue') }}
      </button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/ApiService';
import { useSessionStore } from '../stores/session';
import { useI18n } from 'vue-i18n';

const firstName = ref('');
const lastName = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const session = useSessionStore();
const { t } = useI18n();

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
    await api.completeProfile(
      session.token as string,
      firstName.value,
      lastName.value
    );
    await fetchProfile();
    router.push('/home');
  } catch (e) {
    error.value = t('profile_update_failed');
  }
};
</script>

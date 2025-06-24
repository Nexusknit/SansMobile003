<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">Enter Code</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="code"
        placeholder="SMS Code"
        class="border rounded-md p-3 text-lg"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        Verify
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

const route = useRoute();
const router = useRouter();
const session = useSessionStore();

const code = ref('');
const error = ref<string | null>(null);
const phone = route.query.phone as string;

const fetchProfile = async () => {
  try {
    const { data } = await api.getProfile(session.token as string);
    session.user = data;
  } catch (e) {
    error.value = 'Failed to load profile';
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
    error.value = 'Verification failed';
  }
};
</script>

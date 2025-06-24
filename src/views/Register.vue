<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">Complete Profile</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="firstName"
        placeholder="First name"
        class="border rounded-md p-3 text-lg"
      />
      <input
        v-model="lastName"
        placeholder="Last name"
        class="border rounded-md p-3 text-lg"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        Continue
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

const firstName = ref('');
const lastName = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const session = useSessionStore();

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
    await api.completeProfile(
      session.token as string,
      firstName.value,
      lastName.value
    );
    await fetchProfile();
    router.push('/home');
  } catch (e) {
    error.value = 'Profile update failed';
  }
};
</script>

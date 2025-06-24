<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">Login</h1>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="phone"
        type="tel"
        placeholder="Mobile number"
        class="border rounded-md p-3 text-lg"
      />
      <button class="bg-blue-600 text-white py-3 rounded-md" type="submit">
        Send Code
      </button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '../api/ApiService';
import { useRouter } from 'vue-router';

const phone = ref('');
const error = ref<string | null>(null);
const router = useRouter();

const submit = async () => {
  error.value = null;
  try {
    await api.sendPhoneNumber(phone.value);
    router.push({ path: '/enter-code', query: { phone: phone.value } });
  } catch (e) {
    error.value = 'Failed to send code';
  }
};
</script>

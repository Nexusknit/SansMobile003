<template>
  <div class="p-4 flex flex-col h-full">
    <h1 class="text-xl font-semibold text-center mb-4">
      {{ $t('welcome') }} {{ session.user?.firstName }}
    </h1>
    <button class="bg-red-600 text-white py-3 rounded-md" @click="logout">
      {{ $t('logout') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../stores/session';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const session = useSessionStore();
const router = useRouter();

const logout = () => {
  session.clear();
  router.push('/login');
};
</script>

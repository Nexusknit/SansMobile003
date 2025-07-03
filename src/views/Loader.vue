<template>
  <div class="flex flex-col items-center justify-center h-full p-4">
    <div v-if="checking" class="text-center">
      <p>{{ t('loading') }}</p>
    </div>
    <div v-else-if="offline" class="text-center">
      <p class="mb-4 text-red-600">{{ t('connection_error') }}</p>
      <button class="bg-blue-600 text-white py-2 px-4 rounded-md" @click="check">
        {{ t('retry') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '../stores/session';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const session = useSessionStore();
const { t } = useI18n();

const checking = ref(true);
const offline = ref(false);

const proceed = () => {
  if (session.token && !session.isExpired()) {
    router.replace('/home');
  } else {
    router.replace('/login');
  }
};

const check = () => {
  checking.value = true;
  offline.value = false;
  if (navigator.onLine) {
    proceed();
  } else {
    offline.value = true;
  }
  checking.value = false;
};

onMounted(() => {
  check();
});
</script>

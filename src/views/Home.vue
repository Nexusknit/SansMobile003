<template>
  <div class="flex flex-col min-h-screen justify-center items-center p-4">
    <h1
      class="text-lg sm:text-xl font-semibold text-center mb-4 break-words px-4"
    >
      {{ t("welcome") }} {{ session.user?.firstname }}
    </h1>
    <n-button type="error" block :loading="loading" @click="logout">
      {{ t("logout") }}
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from "../stores/session";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useMessage } from "naive-ui";

import api from "../api/ApiService";

const session = useSessionStore();
const router = useRouter();
const { t } = useI18n();
const message = useMessage();
const loading = ref(false);

const logout = async () => {
  loading.value = true;
  try {
    if (session.token) {
      const response = await api.logout(session.token);
      console.log("Logout response:", response);
      message.success(t("logout")); // Optional toast
    }
  } catch (e) {
    console.error("Logout failed:", e);
    message.error(t("profile_update_failed")); // Adjust message key if needed
  } finally {
    session.clear();
    loading.value = false;
    router.push("/login");
  }
};
</script>

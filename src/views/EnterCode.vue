<template>
  <div class="flex flex-col min-h-screen justify-center items-center p-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-2">
        {{ t("enter_verification_code") }}
      </h1>
      <p class="text-gray-500 text-sm mb-1">
        {{ t("sent_to_start") }} <span class="font-medium">{{ phone }}</span>
        {{ t("send_to_end") }}
      </p>
      <router-link to="/login" class="text-sm text-blue-500">
        {{ t("edit") }}
      </router-link>
    </div>

    <div class="flex flex-col items-center gap-4 mt-6">
      <n-input-otp
        v-model:value="otpArray"
        :length="6"
        size="large"
        dir="ltr"
        autocomplete="one-time-code"
        style="
          font-family: 'Roboto', sans-serif;
          font-feature-settings: 'lnum';
          direction: ltr;
        "
      />
      <p class="text-sm text-gray-600">{{ t("resend_code_timer") }} 0:49</p>
      <n-button
        class="w-12 h-12 rounded-full flex items-center justify-center"
        @click="submit"
        :disabled="otpArray.join('').length !== 6 || loading"
        :loading="loading"
        style="background-color: rgb(34 197 94 / var(--tw-bg-opacity))"
      >
        <i
          v-if="!loading"
          :class="
            otpArray.join('').length === 6
              ? 'fas fa-check text-white'
              : 'fas fa-check text-white opacity-30'
          "
          class="text-xl"
        />
      </n-button>
      <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api/ApiService";
import { useSessionStore } from "../stores/session";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const session = useSessionStore();

const otpArray = ref<string[]>(["", "", "", "", "", ""]);
const error = ref<string | null>(null);
const loading = ref(false);
const { t } = useI18n();
const phone = route.query.phone as string;

const fetchProfile = async () => {
  try {
    const { data } = await api.getProfile(session.token as string);
    session.user = data;
  } catch (e) {
    error.value = t("load_profile_failed");
  }
};

const submit = async () => {
  error.value = null;
  loading.value = true;
  try {
    const { data } = await api.verifyCode(phone, otpArray.value.join(""));
    session.saveToken(data.token);
    if (data.isNew) {
      router.push("/register");
    } else {
      await fetchProfile();
      router.push("/home");
    }
  } catch (e) {
    error.value = t("verification_failed");
  } finally {
    loading.value = false;
  }
};
</script>

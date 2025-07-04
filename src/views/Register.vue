<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center p-6"
    :class="t('dir') === 'rtl' ? 'rtl' : 'ltr'"
  >
    <div class="flex flex-col items-center gap-4 w-full max-w-md">
      <i class="fas fa-user-circle text-5xl text-primary" />
      <h1 class="text-3xl font-extrabold text-center mt-2 mb-1">
        {{ t("complete_profile") }}
      </h1>
      <p class="text-center text-gray-500 text-sm">
        {{ t("enter_name_to_continue") }}
      </p>
      <form
        class="w-full flex flex-col items-center gap-4 mt-6"
        @submit.prevent="submit"
      >
        <n-input
          v-model:value="firstName"
          :placeholder="t('first_name')"
          size="large"
          :status="firstName.length === 0 ? 'error' : undefined"
          class="w-full"
        />
        <div v-if="triedSubmit && firstName.length === 0" class="w-full">
          <small class="text-red-500">{{ t("first_name_required") }}</small>
        </div>
        <n-input
          v-model:value="lastName"
          :placeholder="t('last_name') + ' (' + t('optional') + ')'"
          size="large"
          class="w-full"
        />
        <small class="text-gray-500 text-center px-2">
          {{ t("terms_prefix") }}
          <a href="#" class="text-primary underline">{{ t("terms") }}</a>
          {{ t("and") }}
          <a href="#" class="text-primary underline">{{ t("privacy") }}</a>
          {{ t("accept_suffix") }}
        </small>
        <n-button
          type="primary"
          size="large"
          class="rounded-full w-14 h-14 flex items-center justify-center"
          :disabled="firstName.length === 0 || isSubmitting"
          @click="submit"
          :loading="isSubmitting"
        >
          <template #icon>
            <i class="fas fa-check text-xl" />
          </template>
        </n-button>
      </form>
      <p v-if="error" class="text-red-600 mt-2 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../api/ApiService";
import { useSessionStore } from "../stores/session";
import { useI18n } from "vue-i18n";

const firstName = ref("");
const lastName = ref("");
const error = ref<string | null>(null);
const isSubmitting = ref(false);
const triedSubmit = ref(false);
const router = useRouter();
const session = useSessionStore();
const { t } = useI18n();

const isValid = computed(
  () => firstName.value.length > 0 && lastName.value.length > 0
);

const fetchProfile = async () => {
  try {
    const { data } = await api.getProfile(session.token as string);
    session.user = data;
  } catch (e) {
    error.value = t("load_profile_failed");
  }
};

const submit = async () => {
  triedSubmit.value = true;
  error.value = null;
  isSubmitting.value = true;
  try {
    await api.completeProfile(
      session.token as string,
      firstName.value,
      lastName.value
    );
    await fetchProfile();
    router.push("/home");
  } catch (e) {
    error.value = t("profile_update_failed");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

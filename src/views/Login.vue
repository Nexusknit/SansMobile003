<template>
  <div
    class="h-screen overflow-hidden flex items-center justify-center p-4 bg-background text-text-primary"
    :dir="locale === 'fa' ? 'rtl' : 'ltr'"
  >
    <div
      :class="[locale === 'fa' ? 'text-right' : 'text-left']"
      class="w-full max-w-sm space-y-6"
    >
      <div
        :class="[
          'text-sm text-primary cursor-pointer',
          locale === 'fa' ? 'text-left' : 'text-right',
        ]"
        @click="toggleLanguage"
      >
        {{ t("lang_toggle") }}
      </div>
      <h1 class="text-2xl font-bold">{{ t("welcome") }}</h1>
      <p class="text-sm text-text-secondary">
        {{ t("enter_mobile_description") }}
      </p>
      <div>
        <label class="block text-sm text-primary mb-1">{{
          t("mobile_placeholder")
        }}</label>
        <n-input
          v-model:value="phone"
          class="farsi-digits"
          maxlength="11"
          inputmode="numeric"
          :placeholder="t('mobile_placeholder_example')"
          @input="formatPhone"
          dir="ltr"
        />
      </div>
      <p class="text-xs text-text-secondary leading-5">
        {{ t("terms_prefix") }}
        <span class="text-primary cursor-pointer">{{ t("terms") }}</span>
        {{ t("and") }}
        <span class="text-primary cursor-pointer">{{ t("privacy") }}</span>
        {{ t("accept_suffix") }}
      </p>
      <div class="flex w-full">
        <div :class="locale === 'fa' ? 'mr-auto' : 'ml-auto'">
          <n-button
            type="primary"
            circle
            size="large"
            :loading="loading"
            :disabled="phone.length !== 11"
            @click="submit"
          >
            <template #icon>
              <i
                :class="
                  locale === 'fa' ? 'fas fa-arrow-left' : 'fas fa-arrow-right'
                "
              ></i>
            </template>
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../api/ApiService";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMessage } from "naive-ui";

const phone = ref("");
const loading = ref(false);
const router = useRouter();
const { t, locale } = useI18n();
const message = useMessage();

const formatPhone = (value: string) => {
  const persianToEnglish = value.replace(/[۰-۹]/g, (d) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
  );
  phone.value = persianToEnglish.replace(/\D/g, "").slice(0, 11);
};

const submit = async () => {
  loading.value = true;
  try {
    const normalized = phone.value;
    const response = await api.sendPhoneNumber(normalized);

    console.log("API response:", response);

    if (response?.status >= 200 && response?.status < 300) {
      router.push({ path: "/enter-code", query: { phone: normalized } });
    } else {
      message.error(t("send_code_failed"));
    }
  } catch (e) {
    message.error(t("send_code_failed"));
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const toggleLanguage = () => {
  locale.value = locale.value === "fa" ? "en" : "fa";
};
</script>

<style scoped lang="scss">
.bg-background {
  background-color: var(--color-background);
}

.text-text-primary {
  color: var(--color-text-primary);
}

.text-primary {
  color: var(--color-primary);
}

.farsi-digits {
  font-feature-settings: "tnum";
  font-family: inherit;
  direction: ltr;
  unicode-bidi: plaintext;
  direction: ltr !important;
  text-align: left;
}

.farsi-digits::placeholder {
  direction: ltr;
  text-align: left;
}
</style>

import { createI18n } from 'vue-i18n';

const messages = {
  fa: {
    login: 'ورود',
    mobile_placeholder: 'شماره موبایل',
    send_code: 'ارسال کد',
    enter_code: 'ورود کد',
    sms_code_placeholder: 'کد پیامک',
    verify: 'تایید',
    complete_profile: 'تکمیل پروفایل',
    first_name: 'نام',
    last_name: 'نام خانوادگی',
    continue: 'ادامه',
    welcome: 'خوش آمدید',
    logout: 'خروج',
    send_code_failed: 'ارسال کد انجام نشد',
    verification_failed: 'تایید انجام نشد',
    profile_update_failed: 'به‌روزرسانی پروفایل انجام نشد',
    load_profile_failed: 'خطا در دریافت پروفایل',
    connection_error: 'اتصال اینترنت برقرار نیست',
    retry: 'تلاش دوباره',
    loading: 'در حال بررسی اتصال...'
  },
  en: {
    login: 'Login',
    mobile_placeholder: 'Mobile number',
    send_code: 'Send Code',
    enter_code: 'Enter Code',
    sms_code_placeholder: 'SMS Code',
    verify: 'Verify',
    complete_profile: 'Complete Profile',
    first_name: 'First name',
    last_name: 'Last name',
    continue: 'Continue',
    welcome: 'Welcome',
    logout: 'Logout',
    send_code_failed: 'Failed to send code',
    verification_failed: 'Verification failed',
    profile_update_failed: 'Profile update failed',
    load_profile_failed: 'Failed to load profile',
    connection_error: 'No internet connection',
    retry: 'Retry',
    loading: 'Checking connection...'
  }
};

export default createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages
});

import LoginScreenAr from "./LoginScreen/ar"
import { Translations } from "./fr"
import HomeScreenAr from "./HomeScreen/ar";

const ar: Translations = {
  common: {
    "ok": "حسناً!",
    "cancel": "إلغاء",
    "back": "رجوع",
    "select": "اختر عنصرًا",
    "yes": "نعم",
    "no": "لا",
    "or": "أو",
    "validate": "تحقق",
    "continue": "استمرار",
    "retry": "إعادة المحاولة",
    "elapsedSeconds": "{{seconds}} ثانية{{secondsSuffix}}",
    "elapsedMinutes": "{{minutes}} دقيقة{{minutesSuffix}}",
    "cancelNavigation": "إلغاء التنقل",
    "arrived": "وصلت",
    "location": "\n{{makerAddress}}\n{{addressComplement}}\n\n",
    "close": "إغلاق",
    "then": "ثم",
    "recenter": "إعادة المركز",
    "error": "خطأ",
    "disconnection": "انقطاع الاتصال",
    "configuration": "الإعدادات",
    "downloadNewVersion": "تحميل النسخة الجديدة",
    "showChangeLog": "عرض سجل التغييرات",
    "disconnect": "فصل الاتصال",
    "versionNoLongerAccessible": "هذه النسخة لم تعد متاحة",
    "pleaseUpdateTheApp": "يرجى تحديث التطبيق",
    "makeSureYouAreOnAnActiveNetwork": "تأكد أنك على شبكة نشطة",
    "locationServicesAreDisabled": "خدمات الموقع غير مفعلّة.\nيرجى تفعيلها لاستخدام الخريطة.",
    "important": "مهم",
    "warning": "تحذير",
    "second": "ثانية",
    "seconds": "ثواني",
    "minute": "دقيقة",
    "minutes": "دقائق",
    "and": "و",
    "km": "كم",
    "version": "نسخة",
  },
  errorScreen: {
    "title": "حدث خطأ!",
    "friendlySubtitle": "حدث خطأ. يرجى الاتصال بالمسؤول.",
    "reset": "إعادة تعيين التطبيق",
  },
  emptyStateComponent: {
    "generic": {
      "heading": "فارغ جداً... حزين",
      "content": "لا توجد بيانات حتى الآن. حاول الضغط على الزر لتحديث أو إعادة تحميل التطبيق.",
      "button": "لنحاول مرة أخرى",
    },
  },
  loginScreen: LoginScreenAr,
  homeScreen: HomeScreenAr
}

export default ar

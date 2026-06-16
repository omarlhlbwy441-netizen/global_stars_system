[app]
# (str) عنوان التطبيق
title = Global Stars System
# (str) اسم الحزمة
package.name = globalstars
# (str) نطاق الحزمة
package.domain = org.design
# (str) مسار الكود المصدري
source.dir = .
# (list) امتدادات الملفات المطلوبة في التطبيق
source.include_exts = py,png,jpg,kv,atlas,json,ttf
# (str) إصدار التطبيق
version = 1.0.0
# (list) المكتبات المطلوبة (متضمنة KivyMD وأدوات الاتصال بالخادم)
requirements = python3,kivy,kivymd,requests,websockets
# (str) اتجاه الشاشة (عمودي ليتناسب مع لعبة الخضار)
orientation = portrait
# (list) الصلاحيات المطلوبة (الوصول للإنترنت للاتصال بـ WebSockets والخادم)
android.permissions = INTERNET, ACCESS_NETWORK_STATE
# (int) إصدار واجهة أندرويد المستهدفة (API Level)
android.api = 33
# (int) أقل إصدار أندرويد مدعوم
android.minapi = 21
# (str) معمارية المعالج المستهدفة للعمل على أحدث الهواتف
android.archs = arm64-v8a, armeabi-v7a

[buildozer]
# (int) مستوى عرض سجلات البناء
log_level = 2
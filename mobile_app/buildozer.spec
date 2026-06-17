[app]
title = Global Stars
package.name = globalstars
package.domain = com.netizen.app
source.dir = .
source.include_exts = py,png,jpg,kv,atlas,ttf
version = 1.0.0
requirements = python3,kivy==2.3.0,kivymd==1.1.1,requests,websockets
orientation = portrait
fullscreen = 0
android.permissions = INTERNET, CAMERA, RECORD_AUDIO, WAKE_LOCK
android.api = 33
android.minapi = 21
android.archs = arm64-v8a, armeabi-v7a
android.allow_backup = True
[buildozer]
log_level = 2
warn_on_root = 1
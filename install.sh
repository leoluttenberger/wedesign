#!/bin/bash
echo "======================================================================================================"
echo "Install and build nodejs"
echo "======================================================================================================"
npm i
npm run build
echo "======================================================================================================"
echo "Create capasitor for android and ios"
echo "======================================================================================================"
npx cap init
npx cap add android
npx cap add ios
npx cap copy
npx cap sync
echo "======================================================================================================"
echo "Init Firebase config"
echo "======================================================================================================"
sh initFirebaseConfig.sh
echo "======================================================================================================"
echo "Configure and build android app plus fastlane"
echo "======================================================================================================"
cp build.gradle.example.android.app $( pwd; )/android/app/
mv $( pwd; )/android/app/build.gradle.example.android.app $( pwd; )/android/app/build.gradle
cd android && gradle build && fastlane init && sudo fastlane add_plugin firebase_app_distribution



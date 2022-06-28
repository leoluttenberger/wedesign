#!/bin/bash

echo "++++++++++++++++++++++++Install and build nodejs++++++++++++++++++++++++"
npm i
npm run build
echo "++++++++++++++++++++++++Create capasitor for android and ios++++++++++++++++++++++++"
npx cap init
npx cap add android
npx cap add ios
npx cap copy
npx cap sync
echo "++++++++++++++++++++++++Init Firebase config++++++++++++++++++++++++"
sh initFirebaseConfig.sh
echo "++++++++++++++++++++++++Configure and build android app++++++++++++++++++++++++"
cp build.gradle.example.android.app $( pwd; )/android/app/
mv $( pwd; )/android/app/build.gradle.example.android.app $( pwd; )/android/app/build.gradle
cd android && sdk install gradle 7.2 && gradle build
echo "++++++++++++++++++++++++Create and install fastlane android distribution++++++++++++"
fastlane init
sudo fastlane add_plugin firebase_app_distribution



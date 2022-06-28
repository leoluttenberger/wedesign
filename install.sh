#!/bin/bash
echo "NVM install"
nvm use
nvm install
echo "Installing dependensies ruby, firebase-tools, fastlane"
sudo npm install ruby firebase-tools 
sudo gem install fastlane
echo "Install and build nodejs"
npm install
npm run build
echo "Create capasitor for android and ios"
npx cap init
npx cap add android
npx cap add ios
npx cap copy
npx cap sync
echo "Init Firebase config"
sh initFirebaseConfig.sh
echo "Configure and build android app"
cp build.gradle.example.android /android/
mv /android/build.gradle.example.android build.gradle
cp build.gradle.example.app /android/app/
mv /android/app/build.gradle.example.app build.gradle
cd android && chmod +x gradlew && ./gradlew build
echo "Create and install fastlane android distribution"
fastlane init
sudo fastlane add_plugin firebase_app_distribution

#!/bin/bash
echo "======================================================================================================"
echo "Copy Android Files"
echo "======================================================================================================"
cp ./exampleFiles/build.gradle.example.android $( pwd; )/android/
mv $( pwd; )/android/build.gradle.example.android $( pwd; )/android/build.gradle
echo "======================================================================================================"
cp ./exampleFiles/build.gradle.example.android.app $( pwd; )/android/app/
mv $( pwd; )/android/app/build.gradle.example.android.app $( pwd; )/android/app/build.gradle
echo "======================================================================================================"
echo "Copied Android to destination"
echo "======================================================================================================"
echo "Copy Fastlane Config"
echo "======================================================================================================"
if [ ! -d "$( pwd; )/android/fastlane" ]; then
    mkdir $( pwd; )/android/fastlane
fi
cp ./exampleFiles/Appfile.example $( pwd; )/android/fastlane
mv $( pwd; )./android/fastlane/Appfile.example $( pwd; )/android/fastlane/Appfile
cp ./exampleFiles/Fastfile.example $( pwd; )/android/fastlane
echo "======================================================================================================"
mv $( pwd; )/android/fastlane/Fastfile.example $( pwd; )/android/fastlane/Fastfile
cp ./exampleFiles/Gemfile.example $( pwd; )/android
mv $( pwd; )/android/Gemfile.example $( pwd; )/android/Gemfile
echo "======================================================================================================"
echo "Copied fastlane files to destination!"
echo "======================================================================================================"
echo "Download 'google-services.json' from firebase console account and put it into '~/android/app' folder!"
echo "======================================================================================================"
echo "Build Android with : 'export ANDROID_SDK_ROOT=~/Android/Sdk' './android/gradlew build'"
echo "======================================================================================================"
echo "Fastlane Deploy Init and Configure"
echo "======================================================================================================"
cd android && fastlane init
cd fastlane && fastlane add_plugin firebase_app_distribution
echo "======================================================================================================"
echo "Download 'firebase_credentials.json' from Service-Accounts -> Android Distribution -> Generate Access-Key"
echo "https://console.cloud.google.com/iam-admin/iam?authuser=0&project=wedesign-35121"
echo "======================================================================================================"
echo "Copy 'firebase_credentials.json' to '~/android/ folder manually!" 
echo "======================================================================================================"
echo "Start to Deploy Android App to firebase with:" 
echo "======================================================================================================"
echo "'fastlane distribute " 
echo "======================================================================================================"

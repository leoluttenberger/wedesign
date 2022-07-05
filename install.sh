#!/bin/bash
echo "======================================================================================================"
echo "Installing local project dependensies npm, ruby, firebase-tools, fastlane"
echo "======================================================================================================"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm use
nvm install
sudo npm install -g ruby firebase-tools
sudo gem install  fastlane
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
sh initFastlane.sh
cp build.gradle.example.android.app $( pwd; )/android/app/
mv $( pwd; )/android/app/build.gradle.example.android.app $( pwd; )/android/app/build.gradle
cp build.gradle.example.android $( pwd; )/android/
mv $( pwd; )/android/app/build.gradle.example.android $( pwd; )/android/build.gradle
cd android && gradle build
fastlane init
sudo fastlane add_plugin firebase_app_distribution




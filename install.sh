#!/bin/bash
echo "======================================================================================================"
echo "Installing local project dependensies npm, ruby, firebase-tools, fastlane"
echo "======================================================================================================"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm use
nvm install
npm install -g ruby firebase-tools
sudo gem install fastlane
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
sh ./initFirebaseConfig.sh
sh ./initAndroidBuild.sh




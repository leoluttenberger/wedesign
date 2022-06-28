#!/bin/bash
echo "++++++++++++++++++++++++Installing dependensies nvm++++++++++++++++++++++++"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm use
nvm install
echo "++++++++++++++++++++++++Installing dependensies java 17, gradle  7.4.2++++++++++++++++++++++++"
sudo apt-get install openjdk-17-jre 
curl -s "https://get.sdkman.io" | bash 
source "/home/leo/.sdkman/bin/sdkman-init.sh"
sdk install gradle 7.4.2
echo "++++++++++++++++++++++++Installing dependensies ruby, firebase-tools, fastlane++++++++++++++++++++++++"
sudo npm install ruby firebase-tools gradle
sudo gem install fastlane
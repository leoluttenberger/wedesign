#!/bin/bash
echo "======================================================================================================"
echo "Installing dependensies nvm"
echo "======================================================================================================"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm use
nvm install
echo "======================================================================================================"
echo "Installing dependensies java 17, gradle  7.4.2"
echo "======================================================================================================"
sudo apt-get install openjdk-17-jre 
curl -s "https://get.sdkman.io" | bash 
bash "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install gradle 7.2
echo "======================================================================================================"
echo "Installing dependensies ruby, firebase-tools, fastlane"
echo "======================================================================================================"
sudo npm install -g ruby firebase-tools
sudo gem install fastlane
chmod 775 install.sh    
chmod 775 initFirebaseConfig.sh
echo "======================================================================================================"
echo "Run this commands after script install"
echo "source ~/.sdkman/bin/sdkman-init.sh"
echo "sdk install gradle 7.2"
echo "======================================================================================================"


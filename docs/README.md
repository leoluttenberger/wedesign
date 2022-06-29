# wedesign
## Depedencies

# Dependencies Linux, iOS, Windows
Install nvm for your platform https://github.com/nvm-sh/nvm 
.nvmrc Node Version 16.15.1
Install nodejs version via nvm
```
nvm use
nvm install
```

Install java version 17 https://openjdk.org/install/ or https://www.java.com/en/

Install java version 17 for Ubuntu 20.04
```
sudo apt-get install openjdk-17-jre 
```

Install sdk version control for gradle
```
curl -s "https://get.sdkman.io" | bash 
source "/home/leo/.sdkman/bin/sdkman-init.sh"
sdk install gradle 7.4.2
```

After installing nvm run install script 
```
sh install.sh
```
to auto install and configure project. Script cointains all command below.

```

sudo npm install ruby firebase-tools 
sudo gem install fastlane
```
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Run your unit tests
```
npm run test:unit
```
### Run your end-to-end tests
```
npm run test:e2e
```
### Lints and fixes files
```
npm run lint
```
## Capasitor 
### Seutp

```
npx cap init
```
```
npx cap add android
```
```
npx cap add ios
```
```
npx cap sync
```
```
npm run build
```
```
npx cap copy
```
```
npx cap open android
```
```
npx cap open ios
```
## Firebase

### Auto Config Firebase
Run Script 
```
sh initFirebaseConfig.sh 
```
to configure all firebase environments and init firebase.

### Manual Config Firebase
```
firebase login
```
```
firebase init hosting
```
```
firebase init deploy
```
Change .env.example files to  .env and /android/.env with your firebase env variables
Add Firebase config file to android and ios app directory

#### Manual Build Android app

```
cd android && chmod +x gradlew && ./gradlew build
```
#### Manual Fastlane Config
Make sure to build android app before starting fastlane distribution!
Navigate to android project directory
```
fastlane init
```
```
sudo fastlane add_plugin firebase_app_distribution
```
```
fastlane distribute
```



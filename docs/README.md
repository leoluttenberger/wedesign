# wedesign
## Depedencies

# Dependencies Linux, iOS, Windows
Install Dependencies git curl for all platforms https://git-scm.com/book/en/v2/Getting-Started-Installing-Git, https://everything.curl.dev/get
https://developer.android.com/studio
Ubuntu install curl, git
```
sudo apt-get update
sudo apt-get install git curl apt-transport-https ca-certificates gnupg2 curl
```

Clone Project
```
git clone https://github.com/leoluttenberger/wedesign.git
cd wedesign
```
Install nvm for your platform https://github.com/nvm-sh/nvm for .nvmrc Node Version 16.15.1
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Install sdk version control for gradle verion control and fastlane
```
curl -s "https://get.sdkman.io" | bash 
sdk install java 18.0.1.1-open 
sdk use java 18.0.1.1-open 
sdk install gradle 7.2
sdk use gradle 7.2
```
Install ruby version 2.4.0 with rvm
```
curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import -
curl -sSL https://get.rvm.io | bash -s stable --ruby
source ~/.rvm/scripts/rvm
bundle update
```
Install nodejs version 16.15.1 via nvm
```
nvm use
nvm install

After installing nvm run install script to auto install. 
```
sh install.sh
```
to auto install and configure project. Script cointains all command below.

If gradle build fails in install script, install android sdk and start it with:
```
npx cap open android 
```
Android sdk updates gradle version and plugins.

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
Add firebase_credentials to android folder
```
cd android
fastlane init
```
```
sudo fastlane add_plugin firebase_app_distribution
```
```
fastlane distribute
```




# wedesign
## Depedencies

# Dependencies Linux, iOS, Windows
Install nvm for your platform https://github.com/nvm-sh/nvm
.nvmrc Node Version 16.15.1
```
nvm use
nvm install
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

#### Build Android app
Change <project>/build.gradle
```
buildscript {
  repositories {
    google()  
  }
  dependencies 
    classpath 'com.google.gms:google-services:4.3.12'
  }

}
allprojects {
  repositories {
    google()
  }
}
```
Change <project>/<app-module>/build.gradle

```
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
dependencies {
  implementation platform('com.google.firebase:firebase-bom:30.2.0')
  implementation 'com.google.firebase:firebase-analytics'
}

```



```
cd android && chmod +x gradlew && ./gradlew build
```
#### Fastlane Config
Make sure to build android app before starting fastlane distribution!
Navigate to android project directory
```
fastlane init
```
sudo fastlane add_plugin firebase_app_distribution
```
```
fastlane distribute
```



#!/bin/bash
firebase apps:sdkconfig | tee temp.txt
if grep "project_info" temp.txt; then
	echo "\nCreated google-services.json into android project folder:\N"
	grep -A5000 -m1 -e '{' temp.txt | tee $( pwd; )/android/app/google-services.json
	elif grep "firebase.initializeApp" temp.txt; then
		echo "Created firebase .env file for web application"
		echo "" | tee -a .env
		echo "VUE_APP_FIREBASE_PROJECT_ID = $(grep  -m1 -e 'projectId' temp.txt | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
		echo "VUE_APP_FIREBASE_APP_ID = $(grep  -m1 -e 'appId' temp.txt | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
		echo "VUE_APP_FIREBASE_STORAGE_BUCKET = $(grep  -m1 -e 'storageBucket' temp.txt | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
		echo "VUE_APP_FIREBASE_API_KEY = $(grep  -m1 -e 'apiKey' temp.txt | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
		echo "VUE_APP_FIREBASE_AUTH_DOMAIN = $(grep  -m1 -e 'authDomain' temp.txt | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
		echo "VUE_APP_FIREBASE_MESSAGING_SENDER_ID = $(grep  -m1 -e 'messagingSenderId' temp.txt | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
		echo "VUE_APP_FIREBASE_MEASUREMENT_ID = $(grep  -m1 -e 'measurementId' temp.txt | sed 's/^.*: //')" | tee -a .env
	elif grep "<?xml version=" temp.txt; then
		echo "Created iOS GoogleService-Info.plist"
 	 	grep -A5000 -m1 -e '<?xml version=' temp.txt | tee $( pwd; )/ios/App/App/GoogleService-Info.plist
	else
		"Error no firebase sdk configs found!"
fi
rm temp.txt


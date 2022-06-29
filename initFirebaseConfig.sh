#!/bin/bash
firebase login
echo "!!!!!!!!! Init firebase hosting in folder: (dist) !!!!!!!!!"
read -p "Do you want to add firebase hosting configuration to the project?(y/N) " RESP

if [ "$RESP" = "y" ]; then
	echo "Yes"
	firebase init hosting
else
 	echo "No"
fi

read -p "Do you want to add firebase sdk configuration to the project?(y/N) " RESP

if [ "$RESP" = "y" ]; then  
	echo "Yes"
	tempVar=$(firebase apps:sdkconfig | tee /dev/tty)
	if echo "$tempVar" | grep -q "project_info"; then
		echo "Created google-services.json into android project folder:"
		echo "$tempVar" | grep -A500 -m1 -e '{' | tee $( pwd; )/android/app/google-services.json
		sed -i "1s/.*/{/" $( pwd; )/android/app/google-services.json
		elif echo "$tempVar" | grep -q "firebase.initializeApp"; then
			echo "Created firebase .env file for web application"
			echo "" | tee -a .env
			echo "VUE_APP_FIREBASE_PROJECT_ID = $(echo "$tempVar" | grep  -m1 -e 'projectId' | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
			echo "VUE_APP_FIREBASE_APP_ID = $(echo "$tempVar" | grep  -m1 -e 'appId' | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
			echo "VUE_APP_FIREBASE_STORAGE_BUCKET = $(echo "$tempVar" |grep  -m1 -e 'storageBucket' | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
			echo "VUE_APP_FIREBASE_API_KEY = $(echo "$tempVar" | grep  -m1 -e 'apiKey' | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
			echo "VUE_APP_FIREBASE_AUTH_DOMAIN = $(echo "$tempVar" | grep  -m1 -e 'authDomain' | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
			echo "VUE_APP_FIREBASE_MESSAGING_SENDER_ID = $(echo "$tempVar" |grep  -m1 -e 'messagingSenderId' | sed 's/^.*: //' |  sed 's/.$//')" | tee -a .env
			echo "VUE_APP_FIREBASE_MEASUREMENT_ID = $(echo "$tempVar" | grep  -m1 -e 'measurementId' | sed 's/^.*: //')" | tee -a .env
			elif echo "$tempVar" | grep -q "<?xml version="; then
				echo "Created iOS GoogleService-Info.plist"
	 	 		echo "$tempVar" | grep -A500 -m1 -e '<?xml version=' | sed 's/^.*< //' | tee $( pwd; )/ios/App/App/GoogleService-Info.plist
				var='<?xml version="1.0" encoding="UTF-8"?>'
				sed -i "1s/.*/$var/" ( pwd; )/ios/App/App/GoogleService-Info.plist

	else
	"Error no firebase sdk configs found!"
	fi
else
	echo "No"
fi

#!/bin/bash
cd android && mkdir fastlane
cd ..
cp Appfile.example $( pwd; )/android/fastlane
mv $( pwd; )/android/fastlane/Appfile.example $( pwd; )/android/fastlane/Appfile
cp Fastfile.example $( pwd; )/android/fastlane
mv $( pwd; )/android/fastlane/Fastfile.example $( pwd; )/android/fastlane/Fastfile
cp Gemfile.example $( pwd; )/android
mv $( pwd; )/android/Gemfile.example $( pwd; )/android/Gemfile
echo "Copied fastlane files to destination"
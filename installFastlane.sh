#!/bin/bash
cp Appfile.example $( pwd; )/android/fastlane
mv $( pwd; )/android/fastlane/Appfile.example $( pwd; )/android/fastlane/Appfile
cp Fastfile.example $( pwd; )/android/fastlane
mv $( pwd; )/android/fastlane/Fastfile.example $( pwd; )/android/fastlane/Fastfile
cp Gemfile.example $( pwd; )/android/fastlane
mv $( pwd; )/android/fastlane/Gemfile.example $( pwd; )/android/fastlane/Gemfile
echo "Copien fastlane files to destination"
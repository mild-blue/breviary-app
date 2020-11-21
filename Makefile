sync:
	ionic cap sync

copy:
	ionic cap copy

build:
	ionic build

build-prod:
	ionic build --prod
	copy
	sync

run-ios: build copy sync
	ionic cap open ios

run-android: build copy sync
	ionic cap open android

open-android:
	ionic cap open android

run: npm install
	ng serve

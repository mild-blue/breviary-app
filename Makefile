sync:
	ionic cap sync

copy:
	ionic cap copy

build:
	ionic build

run-ios: build copy sync
	ionic cap open ios

run-android: build copy sync
	ionic cap open android

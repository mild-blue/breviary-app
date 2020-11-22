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

create-built-apk:
	cd android && \
	./gradlew assembleDebug && \
	cd ../ && \
	mv android/app/build/outputs/apk/debug/app-debug.apk mobile-application/android/breviary.apk && \
	echo "The APK is in the following file: mobile-application/android/breviary.apk"

build-apk: build copy sync create-built-apk

run:
	npm install
	ng serve

docker-build:
	docker build -t mildblue/breviary-app .

docker-run:
	docker run -p 8080:80 --rm mildblue/breviary-app
# Flutter

* Install
* Quick launch
* Basics about Flutter app
* Internet permission for AndroidManifest.xml
* Links

### Install 

1. Get [flutter .zip](https://docs.flutter.dev/get-started/install/windows) and 
    - For mobile development you need [Android Studio](https://developer.android.com/studio)
    - For windows application you need [Visual Studio](https://visualstudio.microsoft.com/downloads/) включая в себя "Desktop development with C++" workload

2. Set env variable in windows to folder `flutter/bin/` it will expose `flutter` & `dart`



### Quick launch 

```sh
# init project
flutter create test_app

# cd to "test_app" and run project 
flutter run 

# choose where launch as: 
#  * Windows
#  * Chrome
#  * Android
```



### Basics about Flutter app

Flutter app it is a widget that contains another widgets.

* **Stateless widget** are immutable, meaning that their properties can’t change—all values are final.
* **Stateful widget** maintain state that might change during the lifetime of the widget.  Implementing a stateful widget requires at least two classes: 1) a StatefulWidget class that creates an instance of 2) a State class. The StatefulWidget class is, itself, immutable and can be thrown away and regenerated, but the State class persists over the lifetime of the widget.

### Debug on real device
1. Install from Android Studio in SDK plugins - "Google usb driver"
2. Enable on the phone developer section and allow debuging
```sh
# will start - debug version of app
flutter run 

# will start - release version of app
flutter run --release
```

### Internet permission for AndroidManifest.xml
* Debug version manifest path - `android\app\src\debug\AndroidManifest.xml`
* Release version manifest path - `android\app\src\main\AndroidManifest.xml`



### Links
* [Flutter docs](https://flutter.dev/docs)
* [Cupertino Store](https://codelabs.developers.google.com/codelabs/flutter-cupertino#0)
* [TodoApp tutorial](https://www.youtube.com/watch?v=mOiXndQAZpw&list=WL&index=1&t=1020s&pbjreload=101)
* [Radio tiles](https://github.com/askNilesh/radio_button)
* [Page transitions](https://medium.com/flutter-community/everything-you-need-to-know-about-flutter-page-route-transition-9ef5c1b32823)
* [Cupertino tab bar](https://medium.com/flutter-community/add-a-tab-bar-and-navigation-bar-with-ios-style-in-your-next-flutter-app-bf97b1e27e3a)


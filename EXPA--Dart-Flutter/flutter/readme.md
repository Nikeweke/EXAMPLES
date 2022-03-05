# Flutter

### Installation 

[Instruction](https://flutter.dev/docs/get-started/install/windows)

1. Get flatter .zip
2. Install Android Studio 

### Basics

Flutter app it is a widget that contains another widgets.

* **Stateless widget** are immutable, meaning that their properties can’t change—all values are final.
* **Stateful widget** maintain state that might change during the lifetime of the widget.  Implementing a stateful widget requires at least two classes: 1) a StatefulWidget class that creates an instance of 2) a State class. The StatefulWidget class is, itself, immutable and can be thrown away and regenerated, but the State class persists over the lifetime of the widget.

### Debug on real device
1. Install from Android Studio in SDK plugins - "Google usb driver"
2. Enable on the phone developer section and allow debuging
3. 
```sh
# will start - debug version of app
flutter run 

# will start - release version of app
flutter run --release
```

### Internet permission for AndroidManifest.xml
* Debug version manifest path - `android\app\src\debug\AndroidManifest.xml`
* Release version manifest path - `android\app\src\main\AndroidManifest.xml`

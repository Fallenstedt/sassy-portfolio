---
title: Creating environments in Flutter
published: true
description: A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.
date: 2019-02-24
tags: ["flutter", "dart"]
---

<div class="img-container">
  <img src="https://thepracticaldev.s3.amazonaws.com/i/bwb6frvp74l2zrhwj8zj.jpg">
</div>

A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.

I started playing with Flutter and I was surprised there were not many resources on creating [configs](https://12factor.net/config), everything that is likely to vary between deploys (staging, production, developer environments, etc). Here is a method I have found to be pretty useful.

You can always skip to see a real [Flutter example](https://github.com/Fallenstedt/coffee-bot), or follow along in dart pad.

Here is our basic app.

```dart
class App {
  String final someConfigMember = 'secret';
  String final someOtherConfigMember = 'some other secret';

  App() {}

  runApp() {
    print("Hello World. I am running");
    print(this.someConfigMember);
    print(this.someOtherConfigMember);
  }
}

void main() {
  new App().runApp();
}
```

Our main should always launch a local development environment though. Let's change the contents of this function.

```dart
//snip

void main() {
  Development();
}
```

This is an imaginary development environment. Let's create this development environment as a new Dart class. Our app should also be aware of the development environment through a parameter.

```dart

class App {
  final Development env;

  App(this.env) {}

  runApp() {
    print("Hello World. I am running on $env");
    print(this.env.someConfigMember);
    print(this.env.someOtherConfigMember);
  }
}


class Development {
  static Development d;
  String someConfigMember = 'sup';
  String someOtherConfigMember = 'some private thing';

  Development() {
    // obtain snapshot of this.
    d = this;

    //shove it into our app.
    // call 'runApp'.
    new App(d).runApp();
  }
}

void main() {
  Development();
}
```

Now we need a test environment so we don't do testing on production. Dart allows us to have inheritance (extending a class). Our development, testing, and production environments should extend from a base Env class. We can save ourselves from headaches by creating one class as the source of truth for many environments. Your work should now look something like this.

```dart
class Env {
  static Env d;
  String someConfigMember;
  String someOtherConfigMember;

  Env() {
    // obtain snapshot of this.
    d = this;

    //shove it into our app.
    new App(d).runApp();
  }
}


class App {
  final Env env;

  App(this.env) {}

  runApp() {
    print("Hello World. I am running on $env");
    print(this.env.someConfigMember);
    print(this.env.someOtherConfigMember);
  }
}


class Development extends Env {
  String someConfigMember = 'sup';
  String someOtherConfigMember = 'some private thing';
}


void main() => Development();

```

And that's it. You can create as many environments as you need and tell flutter to run specific files when building. When you decide to use this in flutter, you will need to have your app start with `runApp(App(this))` in your Env class. [You can see an example of this here.﻿](https://github.com/Fallenstedt/coffee-bot/blob/master/lib/env.dart#L8-L11)

Have fun

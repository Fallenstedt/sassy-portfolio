---
title: Building Widgets On Demand with Flutter
description: Creating a scrollable linear array of widgets that are created on demand is easy with Flutter. While laying out the list, visible children's elements, states and render objects will be created lazily based on the widget's position
tags: ["flutter", "dart"]
date: 2019-05-10
draft: false
---

<div class="img-container">
  <img src="https://thepracticaldev.s3.amazonaws.com/i/1v01weepczjqzeh0cdrf.jpg">
</div>

There are many ways to display a large list of items when building your app. Say you had to display an infinite amount of list items that a user can scroll through. Naively, you can fetch thousands of list items and build them all. This can work, however, you most likely will have frustrated users with insane load times.

So how can we build our list items, or widgets, on demand? Using `ListView` and `FutureBuilder` we can accomplish this. I'm going to start by creating a new Flutter application, deleting everything in `main.dart` and replace it with the following:

```dart
// main.dart
import 'package:flutter/material.dart';
import 'src/app.dart';

void main() {
  runApp(App());
}
```

Our App is a basic MaterialApp which holds a `OnDemandList` widget. This will be home to our 'infinite' list of items.

```dart
// app.dart
import 'package:flutter/material.dart';
import './screens/big_list.dart';

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return child: MaterialApp(
        title: 'OnDemandList',
        home: BigList(),
      );
  }
}
```

Before we think about lazy loading items...let's focus first on putting lots of items in our app. Here, we are using [ListView.builder()](https://docs.flutter.io/flutter/widgets/ListView/ListView.builder.html) to create a scrollable, linear array of widgets that are created on demand. The neat thing is that even though we have specified `1000` items, it will only build the amount of items that are visible on the screen.

How it accomplishes this is by taking the first item in the list and measuring its height. In this example, the height of the item is `80`. Flutter can measure the height of the screen and build the amount of items needed.

```dart
// big_list.dart';
import 'package:flutter/material.dart';
import 'dart:async';


class BigList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Lots of Items'),
        ),
        body: buildList(),
    );
  }

  Widget buildList() {
    return ListView.builder(
      itemCount: 1000,
      itemBuilder: (BuildContext context, int index) {
        return Container(
          height: 80,
          child: Text("$index hello World"),
        );
      },
    );
  }
}

```

<div class="img-container">
  <img src="https://thepracticaldev.s3.amazonaws.com/i/65bjygtl3kho2nzrkeox.gif">
</div>

Each time we scroll, Flutter is building the list items that appear in our view. This is what we are aiming for, however, say each list item needs to make an async request to fetch data. We can use [FutureBuilder](https://docs.flutter.io/flutter/widgets/FutureBuilder-class.html). Flutter is async by nature, and Futures allows us to work with data without worrying about threads or blocking our application. FutureBuilders easily allow you to show different states while your data is loading, and on complete, show a specified Widget. Here is a very simple example without checking for errors or connection states:

```dart
// big_list.dart';

import 'package:flutter/material.dart';
import 'dart:async';

class BigList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Lots of Items'),
        ),
        body: buildList(),
    );
  }

  Widget buildList() {
    return ListView.builder(
      itemCount: 1000,
      itemBuilder: (BuildContext context, int index) {
        return FutureBuilder(
          future: getFuture(), // <--- get a future
          builder: (BuildContext context, snapshot) { // <--- build the things.
            return Container(
              height: 80.0,
              child: snapshot.hasData ? snapshot.data : Text('loading..'),
            );
          },
        );
      },
    );
  }

 Future<Widget> getFuture() {
    return Future.delayed(Duration(seconds: 2), () => Text('Hello World!'));
  }
}
```

<div class="img-container">
  <img src="https://thepracticaldev.s3.amazonaws.com/i/ujxp4sci5iulopm3cub8.gif">
</div>

Notice how we see `loading...` for 2 seconds and then a new Text widget of "Hello World!" appearing. This is exactly what we needed, a lazy loading list of widgets. With this foundation, you now have the knowledge to build performant apps that build widgets on demand.

Have fun!

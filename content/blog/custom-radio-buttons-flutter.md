---
title: "Custom Radio Buttons in Flutter"
date: 2019-07-06
draft: true
description: Building your own custom widgets in Flutter is not that scary at all. By combining multiple types of widgets, we can create our own reusable radio buttons.
---

You're tasked to create a native mobile app which has form. The form requires radio buttons and you decide to use Flutters Radio Button Widget. It works great initially, but you don't like the padding, you can't add icons, and overall it's too limited based on the designs you were handed.

> Gee, I wonder if I could create my own custom flutter widgets.

Well you're in luck because I had to create some custom radio buttons and learned some fun things along the way.

## The Skeleton

I'm going to cut to the chase and give you a hello world app to start with

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Center(
      child: Text("Hello!"),
    );
  }
}
```

## Radio Buttons Class

The form we'll create allows a user to choose their favorite food. We'll begin by creating an enum of some food items. To choose a food item, a user taps a radio button. A radio button must know what value it has, and what value the group has. Knowing this, a radio button's state can be derived by these two values. If a radio button's value looks like its group value, then the radio button is selected. What we create next is only partially correct.

```dart
// snip...
// create an enum of options
enum Food {
  Cookies,
  Pizza,
  IceCream,
  Grapes,
}

// create the widget that will act has a radio button
class MyRadioButton extends StatelessWidget {
  final Food value; // The value of the radio button
  final Food groupValue; // The selected value of the group

  MyRadioButton({
    @required this.value,
    @required this.groupValue,
  });

  @override
  Widget build(BuildContext context) => Text("I am a real button");
}
```

This code is not that great because the enum is tightly coupled to the `MyRadioButton` class. What would happen if we need a favorite food radio group, and a favorite sport radio group? Or any `n` groups for that matter? Let's use generics to improve `MyRadioButton`. We'll say that `T` can be any type of enum.

```dart
//... snip
// With a generic, our radio button can be part of any group `T`.
class MyRadioButton<T> extends StatelessWidget {
  final T value;
  final T groupValue;

  MyRadioButton({
    @required this.value,
    @required this.groupValue,
  });

  @override
  Widget build(BuildContext context) => Text("I am a real button");
}
```

Now that we have a skeleton, let's create a StatefulWidget. This will be where the `groupValue` for our form lives. You could tuck this value into a BLoC for an extra challenge. The Form widget will construct a list of options from our `Food` enum, and tuck this list of widgets into a Column. Notice how the generic is used in each `MyRadioButton`. To get you up to speed, your code should look like this now:

INCLUDE 1.JPG HERE.

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Center(
      child: MyForm(),
    );
  }
}

class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  Food groupValue = Food.Invalid;

  @override
  Widget build(BuildContext context) {
    final List<Widget> options = [
      MyRadioButton<Food>(groupValue: groupValue, value: Food.Cookies),
      MyRadioButton<Food>(groupValue: groupValue, value: Food.Pizza),
      MyRadioButton<Food>(groupValue: groupValue, value: Food.IceCream),
      MyRadioButton<Food>(groupValue: groupValue, value: Food.Grapes)
    ];

    return Scaffold(
      body: Container(
        child: Column(
          children: options,
        ),
      ),
    );
  }
}

enum Food {
  Invalid,
  Cookies,
  Pizza,
  IceCream,
  Grapes,
}

class MyRadioButton<T> extends StatelessWidget {
  final T value;
  final T groupValue;

  MyRadioButton({
    @required this.value,
    @required this.groupValue,
  });

  @override
  Widget build(BuildContext context) => Text(value.toString());
}

```

## Tappable buttons

A user should be able to select each item. Let's update our `MyRadioButton` class and make it pretty. Adding the InkWell Widget lets us define an area that responds to touch. As a freebie, we get a splash effect. For now, we'll only have our radio button print its value to the console. I also gave it a random width and height, but you can make it whatever you need it to be. You should take the time to read up on the <a href="https://api.flutter.dev/flutter/material/InkWell-class.html">InkWell class</a> on Flutter's API docs.

```dart
class MyRadioButton<T> extends StatelessWidget {
  final T value;
  final T groupValue;

  MyRadioButton({
    @required this.value,
    @required this.groupValue,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => print(value),
      child: Container(
        height: 40.0,
        width: 200.0,
        child: Text(
          value.toString(),
        ),
      ),
    );
  }
}
```

INCLUDE 2 INK WELL gif

## Form State

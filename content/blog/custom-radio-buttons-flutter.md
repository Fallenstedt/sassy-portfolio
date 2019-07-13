---
title: "Custom Widgets in Flutter"
date: 2019-07-06
draft: false
description: Building your own custom widgets in Flutter is not easy scary at all. By combining multiple types of widgets, we can create anything we want..
---

You're tasked to create a native mobile app which has a form. The form requires radio buttons and you decide to use Flutters Radio Button Widget. It works great, but you don't like the padding, you can't add icons, and overall it's too limited based on the designs you were handed.

> Gee, I wonder if I could create my own custom flutter widgets.

In this Flutter tutorial, we will create a custom radio button. You will learn how to

- Manage state in your widget
- Handle user interaction
- Trigger animations

## Skeleton

Here is the app we are starting with. It creates a home screen with the text hello.

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

<hr>

## Radio Buttons

A radio button's state can be derived from what value it represents, and what value the group of radio buttons have. To define values of our radio button, We can create an enum of `Food` which holds our 5 options where one of them is `Invalid`. A radio button is inavalid when the user has not interacted with the form yet.

```dart
// snip...
// create an enum of options
// Invalid is used when no option is selected
enum Food {
  Invalid,
  Cookies,
  Pizza,
  IceCream,
  Grapes,
}



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

This code is not that great because the enum is tightly coupled to the `MyRadioButton` class. What would happen if we needed a food radio group, and a drink radio group? Or any `n` groups for that matter? Let's use generics to improve `MyRadioButton`. We'll say that `T` can be any type enum. In the future, we may want our form to contain `MyRadioButton<Food>` and `MyRadioButton<Drink>`.

```dart
// ...snip
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

<hr>

## Form

With a basic radio button, let's create a form with our `Food` enum. Our form will be a stateful widget so we can communicate the `groupValue`, or the selected radio button, in that form.

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
    return Center(
      child: MyForm(), // MyForm is used here
    );
  }
}

// Create a StatefulWidget
class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  Food groupValue = Food.Invalid; // The current selected value in the form is invalid.

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

INCLUDE 1.JPG HERE.

<hr>

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

<hr>
## Form State

Without using blocs, we need a way to update the groupValue state in the parent widget so that our radio buttons can know who is selected. To do this, we can pass a function from our parent to our child that sets state. Here, I created a function called `updateGroupValue` in our class `_MyFormState`. It sets the State of groupValue.

```dart
// in _MyFormState
updateGroupValue(dynamic value) => setState(() => groupValue = value);
```

I also did a little refactor with how our radio buttons are build. I create an iterable of food values that do not include `Foo.Invalid`, then use a list comprehension to create them. I also created a new property in `MyRadioButton` to pass a callback to each radio option.

```dart
    // In _MyFormState
    // Create our radio buttons by a list comprehension
    // Pass a callback to each radio button to update our form's state
    final Iterable<Food> validFood = Food.values.where(
      (f) => f != Food.Invalid,
    );

    final List<Widget> options = [
      for (var value in validFood)
        MyRadioButton<Food>(
          groupValue: groupValue,
          value: value,
          onTap: updateGroupValue,
        )
    ];
```

Knowing this, `MyForm` should look like this now. It creates radio options, each with their own callback.

```dart
class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  Food groupValue = Food.Invalid;

  @override
  Widget build(BuildContext context) {
    // Create our radio buttons by a list comprehension
    // Pass a callback to each radio button to update our form's state
    final Iterable<Food> validFood = Food.values.where(
      (f) => f != Food.Invalid,
    );

    final List<Widget> options = [
      for (var value in validFood)
        MyRadioButton<Food>(
          groupValue: groupValue,
          value: value,
          onTap: updateGroupValue, //MyRadioButton now gets a callback
        )
    ];

    return Scaffold(
      body: Container(
        height: double.infinity,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: options,
          ),
        ),
      ),
    );
  }

  updateGroupValue(dynamic value) => setState(() => groupValue = value);
}
```

Our radio buttons now need to know about this callback. We'll use a typedef to keep track of this callback function. A common usage pattern of typedef in Dart is defining a callback interface. The callback we pass into `MyRadioButton<T>` matches that definition. I couldn't figure out how to have a typedef understand our generics, but this works for now.

```dart
typedef void OnTapCallback(dynamic value);

class MyRadioButton<T> extends StatelessWidget {
  final T value;
  final T groupValue;
  final OnTapCallback onTap;

  MyRadioButton({
    @required this.value,
    @required this.groupValue,
    @required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      // When the user taps the button, update the form's groupValue
      onTap: () => onTap(value),
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

---
title: "Custom Radio Buttons in Flutter"
---

So you've tried out Flutter and you've made a few basic apps. You're tasked to create a form and decide to use their Radio Button widget. It works great initially, but you don't like the padding, you can't adjust the icons, and overall it's too limited based on the designs you were handed.

> Gee, I wonder if I could create my own custom radio options.

Well you're in luck because I had to create some custom radio buttons and learned some fun things along the way.

## Breaking down the designs

Look at these designs. We have an icon next to the value, and one of them is disabled by default. Plus, when a user selects a radio option, we need to communicate the updated value to the user. To start, let's break down the design into separate classes.

## Icons

The icon seems simple enough. The designs how the concept of a selected and unselected radio button.

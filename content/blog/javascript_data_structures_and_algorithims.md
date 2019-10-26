---
title: JavaScript Data Structures  - Queues
description: JavaScript frameworks and libraries are ephemeral, but data structures are evergreen. Learn about Queues and where to use them
tags: ["javascript", "DataStructures"]
date: 2019-10-25
draft: false
---

A queue can be thought of as a line at a store. The first customer to enter the line is the first customer to exit the line. Queues are used to order process by inserting and removing elements in that queue.

- To add an item to a queue, we _enqueue_
- To remove an item from a queue, we _dequeue_

We can implement a simple queue with JavaScript's arrays. Lets start by creating a simple function which will be responsible for managing our queue

```javascript
function Queue() {
  this.data = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.peek = peek;

  function enqueue(d) {
    this.data.push(d);
  }

  function dequeue() {
    this.data.shift();
  }

  function peek() {
    return this.data[0];
  }
}
```

We have a function `Queue` which is responsible for creating a new object. When we invoke Queue, we must use the `new` operator like so.

```javascript
const slides = new Queue();
```

This empty object that is created was then set to the current object value of the prototypes created in the Queue. We can then use our Queue to add and remove slides

```javascript
const slides = new Queue();

slides.enqueue(1);
slides.enqueue(2);
slides.data;
// [1, 2]
slides.dequeue();
slides.peek();
// 2
slides.dequeue();
slides.data;
// []
```

This is a simple data structure which I have used to create wizards. You can see this in action for a website I made at for [MyIDCare](https://try.myidcare.com/cyberscan/)

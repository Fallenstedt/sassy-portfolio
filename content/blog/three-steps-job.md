---
title: Three Steps I Took to Get a Job Offer From Amazon
date: 2021-01-12T12:36:41-08:00
slug: "How to succeed at interviews"
description: "Last year, I took the plunge and applied for a Frontend Engineering Position at Amazon. I knew little about the interview process and I had just one month to prepare for it. The result? I got an offer. In fact, the use of the interview techniques below granted me the opportunity to choose between two competing job offers. In this guide I will reveal the steps I took in order to become a competitive candidate."
keywords: [amazon, interview, career]
draft: false
tags: [career]
---

Last year, I took the plunge and applied for a Frontend Engineering Position at Amazon. I knew little about the interview process and I had just one month to prepare for it. The result? I got an offer. In fact, the use of the interview techniques below granted me the opportunity to choose between two competing job offers. In this guide I will reveal the steps I took in order to become a competitive candidate.

## Review Your Accomplishments

On the day of my Amazon interview I chatted with eight people over the period of five hours. Each interviewer was curious to know how my accomplishments have impacted companies I've worked for. To prepare, I spent hours combing through completed JIRA tickets, slack conversations, and logs to measure the impact of my contributions.

![https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb](https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb)

I used the interview prep grid from _Cracking the Coding Interview, 6th Edition_ to organize information about my past accomplishments. This interview prep grid addresses common topics an interviewer would be curious about— such as leadership skills, conflict resolution, and experiences with failure. **[Start documenting your accomplishments with this google sheet template I made](https://docs.google.com/spreadsheets/d/1SHccghyhw08cJVvA3DLfG5lfVvXPBWvJGjIfe5Rqojs/edit?usp=sharing).**

Completing the interview prep grid is fundamental to having a successful interview. In the grid, columns represent projects or jobs you've had and rows represent topics the interviewer will be curious about. Complete the grid to analyze the role you played in high impact projects and you will discover talking points for your interview.

I continue to fill out my grid, even now, because having a written record of my work experiences will simplify things if I ever need to prepare for another interview. It's important to keep a record of both failures and accomplishments. I focus on describing my own accomplishments as opposed to my team's accomplishments. To begin brainstorming your work experiences as a software engineer, ask yourself these questions:

- What projects have you led? What was the challenging about them?
- Have you taken down production before? How did you help resolve the situation?
- What have you made simpler at work? What was the outcome?

For reference, below is an example of a column from my interview prep grid that I used at my Amazon interview.

| Common Questions              | Angular App Refactor                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --- |
| Challenges                    | \* Refactor Angular app to reduce redundant network requests by 78%.                                                      |     |
| Mistakes/Failures             | \* Took down production with a single line of untested code being changed                                                 |     |
| Enjoyed                       | \* Teaching the team how observables work and pub sub design pattern                                                      |     |
| Leadership                    | \* Identified production outage via 1 star review. created lambda canary coverage to ensure we are alerted to the minute. |     |
| Conflicts                     | \* Teaching the team how observables work and pub sub design pattern.                                                     |     |
| What you would do differently | \* I would have started teaching the team how to use RxJS sooner                                                          |     |

## Prepare for Behavioral Interview Questions

A large part of the interview focuses on [Amazon's Leadership Principles](https://www.amazon.jobs/en/principles). Take the time to understand the meaning of these leadership principles and how you relate to them. You've probably followed these leadership principles throughout your career without necessarily being conscious of them. Be prepared to share examples of how you have followed these principles. Make an effort to really study these principles and memorize how they have guided your work experiences.

My interview process felt quite lengthy. To prepare for several hours of discussion, I searched online for sample Amazon interview questions and made flashcards. Every day, I practiced answering the flashcard questions using examples from my interview prep gird. I wanted to make sure I could confidently answer any behavioral interview question that would come my way.

![https://images.unsplash.com/photo-1515973069-1e40b62f107f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb](https://images.unsplash.com/photo-1515973069-1e40b62f107f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb)

Let's walk through an example interview question and formulate a response using the **Situation Action Result (SAR)** method:

> Tell me about a time you had to quickly adjust your work priorities to meet changing demands?

You can create a response to this type of question by using the interview prep grid to focus on key points that describe your specific work experiences. As you answer, provide evidence that justifies the decisions you have made. At the end of your response, expect the interviewer to dive deeper. I cannot stress how important it is to keep your response reasonably brief so that a discussion can follow. The content of your response is just as important as the _way_ you respond.

The SAR method is a trustworthy interview technique used to create structured and succinct responses to behavioral questions. Using this method will help your interviewer easily follow your thought process. SAR stands for situation, action, result.

- **Situation:** Context and relevant details of your example situation
- **Action**: The steps you took to address the situation, including your decision-making process
- **Result**: The direct effects and measurable result of your efforts

Here is how I answered the above question using the SAR method:

> (Situation) I was notified by our call center that many customers were complaining about our website being down. (Action) A quick test showed parts of our Angular components were loading poorly in production, but loading fine in development. I knew we deployed last week, so the issue must have been caused by a third party library being injected at runtime. I inspected what network events occurred as I interacted with the DOM and discovered _hotjar_, a behavior analytics tool, as the culprit. (Result) I made the code change to remove the 3rd party library from our app, deployed to production, and got our app back online in about 10 minutes. I can go into more detail if you'd like.

In my interview response I was able to highlight these three Amazon leadership principles:

- **Customer Obsession:** I addressed the situation immediately because we risked losing customer trust in our product.
- **Ownership:** Instead of saying, "That's not my job," I took ownership of the problem and quickly began working on a solution.
- **Bias for Action:** I knew that my fix would hinder our marketing department's data collection efforts, but the damage this plugin was causing was greater than the value of analytics, and so I took action.

I recommend making flashcards of sample behavioral interview questions and practicing daily using the SAR method and referencing your interview prep grid. Here are some sample Amazon interview questions to get you started:

- Tell me about a time when you were faced with a problem that had a number of possible solutions. What was the problem and how did you determine the course of action? What was the outcome of that course of action?
- When did you take a risk, make a mistake, or fail? How did you respond and how did you grow from that experience?
- Describe a time you took the lead on a project.
- What did you do when you needed to motivate a group of individuals or promote collaboration on a particular project?
- How have you leveraged data to develop a strategy?
- Describe a time when you took on work outside of your comfort area. How did you identify what you needed to learn to be successful? How did you go about building expertise to meet your goal? Did you meet your goal?

## Confidently Solve Whiteboard Questions

If you're interviewing for an engineering role at Amazon, then you will have whiteboard questions. You may be thinking, "Ugh, whiteboard questions are awful." But if you think whiteboard questions are gruesome, then you're probably not approaching them with the right mindset.

Amazon interviewers ask you to solve whiteboard questions because they want to evaluate your problem solving and communication skills. Interviewers want to see how you approach challenging problems that you've never encountered before. Don't worry about being unable to solve whiteboard questions—the interviewers are more interested in seeing how you work towards the solution than if you are actually able to provide the correct answer.

![https://images.unsplash.com/photo-1502780809386-f4ed7a4a4c59?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb](https://images.unsplash.com/photo-1502780809386-f4ed7a4a4c59?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb)

I had three difficult whiteboard questions that ranged from algorithms, architecture, and designing part of a game. Each question asked was unfamiliar to me despite having studied computer science algorithms in preparation. To answer these questions, I used several techniques to answer these questions to the best of my ability.

### Ask questions to clarify the problem before you start

The quality of your attempt at solving a tough question depends on how well you define the problem you are solving. By asking clarifying questions about the problem, you are laying the groundwork to help you discover acceptance criteria.

In one whiteboard question, I was tasked with creating a "move" function for a board game called [gobblet](https://en.wikipedia.org/wiki/Gobblet). I spent 10 minutes asking my interviewer clarifying questions before I started solving the question. I wrote my thoughts on the whiteboard as I asked questions about expectations, rules for a valid move, and how a winner is determined. By asking clarifying questions I discovered that the problem I was solving for was not just "moving" pieces, but designing application state and having the game be replayable. Once my questions were answered, only then did I begin solving the problem.

If you do not gather information before you start solving a problem, you can miss a lot of valuable context which can improve the quality of your answer. Clarifying questions identify the crux of the problem and steer you away from premature conclusions.

### Voice your thought process so that the interviewer understands what you are thinking at all times.

It is important to communicate your thought process when solving your whiteboard question, especially if you are stuck. Amazon whiteboard questions are meant to explore your critical thinking skills as you tackle an unfamiliar problem. When you communicate your thoughts with your interviewer, you are showing them how you are planning to solve for the solution even if you are uncertain how to solve it.

One of my Amazon Interview questions was to find a value in a sorted and rotated array without using the Array object's built-in methods. I told my interviewer that I've never built a binary search algorithm before, but I had a general idea of how it worked. I explained that if I were to search for a name in a phone book, which I knew began with the letter "M", it would be ridiculous if I started at the first page. Ideally, I'd start somewhere in the middle and see if I need to go forward or backward based on where I landed. To solve for the rotated array, I continued with the phone book analogy and discovered my first step would be finding the index where the rotation starts. Knowing where the rotation started would determine on which "side" of the array my binary search should be performed.

Voicing your thoughts with your interviewer will help you discover a solution if you are unsure how to solve it. When you have constant dialogue with your interviewer, it helps them understand how you think and helps you explore solutions to unfamiliar problems.

## What's next?

I hope you feel inspired to do well at your next interview, even if it's not at Amazon. My Amazon interview was the most challenging interview I've ever had, and I learned that careful review of my accomplishments, public speaking, and critical thinking are the foundation for any successful interview.

If you liked this post, **[follow me on twitter](https://twitter.com/Fallenstedt)** as I document my journey in the software world. I frequently share my knowledge about Rust, Go and Typescript and enjoy meeting others who have the desire to learn.

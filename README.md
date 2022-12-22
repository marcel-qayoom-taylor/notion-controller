# Notion Controller

This is a passion project that I created to automate and amplify my usage of [Notion](https://www.notion.so/) - the note-taking software platform.

## Table of contents
- [Overview](#overview)
  - [The problem](#the-problem)
  - [Demo](#demo)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The problem

As a strong user of notion, I have noticed many limitations in the current version (at the time of writing) of the software. Some of which include clunky multi-page navigation (especially mobile), minimal horizontal layout capabilities and minimal automation opportunities.

I wanted to create a controller that allowed me to tackle some of these problems. As I use Notion every day, I've designed this project to be long term so that I can add functionality for different use-cases over time.

The first use-case I designed for was related to my habit of going to the gym. Every session at the gym, I write down each exercise that I do, how many reps/sets I do and at what weight. Before the solution, I would screenshot the previous session's entry (correlated to the muscle group, e.g. previous cardio session), create a new entry, and write in each exercise as I did them. I would also then refer to the screenshot to see if I increased my weight/rep amount from the previous session and what exercise to do next. This process was very manual and was frustrating due to the clunky navigation.

I wanted a solution where I could tap one button and a new page would be created with pre-filled data from the previous week's correlated session. I wanted this solution to be via my phone as I don't have my computer at the gym.


### Demo



### Links
- Live Site URL: [Live Site](https://notion-controller.vercel.app/) (note that this is configured to my notion so it won't work for you... yet 😉)

## My process

### Built with

- Javascript
- Notion API
- NodeJS
- Express 
- Vercel

### What I learned

- How to deploy on Vercel!
- Conditional routing using Express

### Continued development

I will be using this project as a controller for any future Notion automations that I want to build. 

The next iteration of this would be to track differences in set/rep/weight each session and inject that into the gym diary entry. E.g. if I increase my weight on an exercise by 2kg, the automation would inject a "+2kg!" next to the exercise. Perhaps it could also track improvements long term and show in a graph.

## Author

- LinkedIn - [@marcelqayoomtaylor](https://www.linkedin.com/in/marcelqayoomtaylor/)
- Twitter - [@marcelqtaylor](https://www.twitter.com/marcelqtaylor)

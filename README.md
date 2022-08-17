# Quiz App

This is a quiz application that test users knowledge on basics of programming, fundamentals of computer science and software engineering.
It is a timed test and takes ten (10) minutes to complete.
If user does not complete the questions or user finishes answering the questions and submits, users test score will be returned with answers to the quiz

## Setting up the development environment

First, fork this repo.  
Clone your forked version.  
Run the following command on the cli in the root directory of the project:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

### Updatting quiz question

All quiz questions can be found in the `pages/api` folder and can be accessed on [http://localhost:3000/api/quiz](http://localhost:3000/api/quiz). This endpoint can be edited in `pages/api/quiz.ts`.

## Live Demo
[Quiz App](http://quiz-app-dinakajoy.vercel.app/)

## Author
[Odinaka Joy](http://dinakajoy.com)

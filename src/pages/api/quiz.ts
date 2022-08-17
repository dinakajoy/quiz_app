import type { NextApiRequest, NextApiResponse } from 'next'
import { TQuiz, TQuizResponse } from '../../types/quiz';

const questionsAndAnswers: TQuiz[] = [
  {
    id: 1,
    question: "Whch Programming Language is best for writing System Programs?",
    options: ["ReactJS", "C++", "JavaScript", "CSS"],
    answer: "C++"
  },
  {
    id: 2,
    question: "What is the building block of the web?",
    options: ["Markdown", "Swift", "Kotlin", "HTML"],
    answer: "HTML"
  },
  {
    id: 3,
    question: "What is an Algorithm?",
    options: ["A list of ToDos", "A programming paradigm", "A step by step by detailed guide", "A programming problem"],
    answer: "A step by step by detailed guide"
  },
  {
    id: 4,
    question: "Which of this denotes constant time in Big O Notations?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(log n"],
    answer: "O(1)"
  },
  {
    id: 5,
    question: "What does the acronym RAM stand for?",
    options: ["Related Advanced Memory", "Random Advanced Memory", "Random Access Memory", "Related Access Memory"],
    answer: "Random Access Memory"
  },
  {
    id: 6,
    question: "Which of these is not a sorting algorithm?",
    options: ["Bubble Sort", "Random Sort", "Merge Sort", "Selection Sort"],
    answer: "Random Sort"
  },
  {
    id: 7,
    question: "Which port does FTP runs on by default?",
    options: ["21", "25", "80", "1337"],
    answer: "21"
  },
  {
    id: 8,
    question: "Which of these is not a git command?",
    options: ["git commit", "git rest", "git reset", "git pull"],
    answer: "git rest"
  },
  {
    id: 9,
    question: "Which of these programming paradigms has great support for Composition?",
    options: ["Structured Programming", "Functional Programming", "Object Oriented Programming", "Imperative Programming"],
    answer: "Functional Programming"
  },
  {
    id: 10,
    question: "Which of these is not one of the CPU phases?",
    options: ["Encode", "Decode", "Fetch", "Execute"],
    answer: "Encode"
  },
  {
    id: 11,
    question: "The speed at which the CPU completes its phases is called _____",
    options: ["Clock Speed", "Clocking", "Clock Cycle", "Clock Movement"],
    answer: "Clock Speed"
  },
  {
    id: 12,
    question: "Which of these is a way to scale a database?",
    options: ["Repitition", "Load Balancing", "Caching", "Replication"],
    answer: "Replication"
  },
  {
    id: 13,
    question: "Which of these is not a storage device?",
    options: ["HSD", "HDD", "SSD", "Flash Drive"],
    answer: "HSD"
  },
  {
    id: 14,
    question: "What does the acronym WWW stand for?",
    options: ["World Web Wide", "Web World Wide", "Western World Web", "World Wide Web"],
    answer: "World Wide Web"
  },
  {
    id: 15,
    question: "Which of these is not a security vulnerability?",
    options: ["SQL Injection", "Cross Site Request Fogery", "Cross Site Scripting", "User Interface Attack"],
    answer: "User Interface Attack"
  },
  {
    id: 16,
    question: "Which of these is not a data structure?",
    options: ["Array", "Stack", "Queue", "Mapping"],
    answer: "Mapping"
  },
  {
    id: 17,
    question: "Which of these is not an architectural pattern?",
    options: ["Monolythic Architecture", "Serverless Architecture", "Automation Architecture", "Layered Architecture"],
    answer: "Automation Architecture"
  },
  {
    id: 18,
    question: "Which of these happens in Stack Data Structure?",
    options: ["The last item to go in comes out last", "The last item to go in comes out first", "The first item to go in comes out first", "All of the above"],
    answer: "The last item to go in comes out first"
  },
  {
    id: 19,
    question: "What is API?",
    options: ["Application Programming Interface", "Automation Programming Interface", "Applied Programme Interface", "Automated Programming Interface"],
    answer: "Application Programming Interface"
  },
  {
    id: 20,
    question: "Lookup Table in Database Design helps to _____",
    options: ["Index out tables", "Create relationships between tables", "Ensure our table is DRY", "Keep track of database users"],
    answer: "Ensure our table is DRY"
  }
]

interface Params {
  page: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TQuizResponse>
) {
  try {
    let { page } = req.query as unknown as Params;

    // If the page is not applied in query.
    if (!page) {
      res.send(questionsAndAnswers);
    }

    let pageToNum = parseInt(page);

    const quiz = questionsAndAnswers[pageToNum];
    const lastPage = questionsAndAnswers.length - 1;
    const numOfQuestion = questionsAndAnswers.length;

    if (pageToNum === 0) {
      res.send({
        prev: false,
        next: true,
        page,
        quiz,
        total: numOfQuestion
      });
    } else if (pageToNum === lastPage) {
      res.send({
        prev: true,
        next: false,
        page,
        quiz,
        total: numOfQuestion
      })
    } else {
      res.send({
        prev: true,
        next: true,
        page,
        quiz,
        total: numOfQuestion
      });
    }
  }
  catch (error) {
    res.status(500);
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { TQuiz } from '../../types/quiz';

const questionsAndAnswers: TQuiz[] = [
  {
    id: 1,
    question: "Whch Programming Language is best for writing System Programs",
    options: ["ReactJS", "C++", "JavaScript", "CSS"],
    answer: "C++"
  },
  {
    id: 2,
    question: "What is the building block of the web",
    options: ["Markdown", "Swift", "Kotlin", "HTML"],
    answer: "HTML"
  },
  {
    id: 3,
    question: "What is the building block of the web",
    options: ["Markdown", "Swift", "Kotlin", "HTML"],
    answer: "HTML"
  },
  {
    id: 4,
    question: "What is the building block of the web",
    options: ["Markdown", "Swift", "Kotlin", "HTML"],
    answer: "HTML"
  }
]

interface Params {
  page: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ prev: boolean, next: boolean, page: string, quiz: TQuiz } | TQuiz[]>
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

    if (pageToNum === 0) {
      res.send({
        prev: false,
        next: true,
        page,
        quiz,
      });
    } else if (pageToNum === lastPage) {
      res.send({
        prev: true,
        next: false,
        page,
        quiz,
      })
    } else {
      res.send({
        prev: true,
        next: true,
        page,
        quiz,
      });
    }
  }
  catch (error) {
    res.status(500);
  }
}

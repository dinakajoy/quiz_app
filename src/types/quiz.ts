export type TQuiz = {
  id: number,
  question: string,
  options: string[],
  answer: string
}

export type TQuizResponse = {
  prev: boolean, 
  next: boolean, 
  page: string, 
  quiz: TQuiz, 
  total: number 
} | TQuiz[]

export type TSavedAnswer = {
  [key: string]: string
}
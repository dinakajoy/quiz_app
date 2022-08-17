import Link from "next/link";
import useSWR from "swr";
import { TQuiz, TSavedAnswer } from "../types/quiz";
import styles from "../styles/Quiz.module.css";

export default function Result() {
  const getAnswers: string =
    typeof window !== "undefined" && localStorage.getItem("quiz") ||JSON.stringify({});

  const answers: TSavedAnswer = JSON.parse(getAnswers);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`./api/quiz`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  let correctAnswers = 0;
  if (data) {
    data.map((quiz: TQuiz) => {
      if (quiz.answer === answers[quiz.id]) {
        correctAnswers = correctAnswers + 1;
      }
    });
  }

  return (
    <>
      <div className={styles.centered}>
        <Link href="/">
          <a className={styles.startBtn}>Retake</a>
        </Link>
      </div>
      <h2>
        You answered {correctAnswers} questions correctly. You{" "}
        {correctAnswers > (data.length / 100) * 70 ? "Passed 😃" : "Failed 🥺"}{" "}
      </h2>
      <br />

      {data.map((quiz: TQuiz) => (
        <>
          <div key={quiz.id}>
            <p>{quiz.question}</p>
          </div>
          <ul className={styles.ul}>
            {quiz.options.map((option: string, i: number) => (
              <li className={styles.option} key={i}>
                {option === quiz.answer ? (
                  quiz.answer === answers[quiz.id] ? (
                    <span>{option} &nbsp; ✅</span>
                  ) : (
                    <span>{option}</span>
                  )
                ) : answers[quiz.id] === option ? (
                  <>
                    <s>{option}</s> &nbsp;❌
                  </>
                ) : (
                  <s>{option}</s>
                )}
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
}

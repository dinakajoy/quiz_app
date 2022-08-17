import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import useSWR from "swr";
import { TSavedAnswer } from "../types/quiz";
import styles from "../styles/Quiz.module.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Quiz() {
  const router = useRouter();
  const Ref = useRef<NodeJS.Timer | null>(null);
  const [timer, setTimer] = useState("00:10:00");

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: Date) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e: Date) => {
    setTimer("00:10:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime: () => Date = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 600);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const [pageIndex, setPageIndex] = useState(0);
  const [answered, setAnswered] = useState<TSavedAnswer>({});

  const { data, error } = useSWR(`/api/quiz?page=${pageIndex}`, fetcher);

  if (error) {
    return (
      <div className={styles.info}>
        <h2>{timer}</h2>
        <h3>Failed to load</h3>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.info}>
        <h2>{timer}</h2>
        <h3>Loading...</h3>
      </div>
    );
  }
  const { quiz, next, prev, page, total } = data;

  const addAnswer = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const latestAnswers = { ...answered, [name]: value };
    setAnswered(latestAnswers);
    window.localStorage.setItem("quiz", JSON.stringify(latestAnswers));
  };

  if (timer === "00:00:00") {
    router.push("/result");
  }

  return (
    <>
      <div className={styles.info}>
        <h2>{timer}</h2>
        <p>
          {parseInt(page) + 1} of {total}
        </p>
      </div>
      <div>
        <div key={quiz.id}>
          <p>{quiz.question}</p>
        </div>
        <ul>
          {quiz.options.map((option: string, i: number) => (
            <li className={styles.option} key={i}>
              <input
                type="radio"
                name={quiz.id.toString()}
                onChange={(e) => addAnswer(e)}
                value={option}
                checked={answered[quiz.id] === option}
              />
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.navBtns}>
        {prev ? (
          <button onClick={() => setPageIndex(pageIndex - 1)}>
            Previous Question
          </button>
        ) : (
          <Link href="/">
            <a>Cancel</a>
          </Link>
        )}
        {next ? (
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={answered[quiz.id] === undefined}
            className={
              answered[quiz.id] === undefined ? "disabledBtn" : "activeBtn"
            }
          >
            Next Question
          </button>
        ) : (
          answered[quiz.id] !== undefined && (
            <Link href="/result">
              <a className={styles.finish}>Finish</a>
            </Link>
          )
        )}
      </div>
    </>
  );
}

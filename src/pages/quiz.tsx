import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import styles from "../styles/Quiz.module.css";

export default function Quiz() {
  const router = useRouter();
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:10:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
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

  const startTimer = (e) => {
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

  const clearTimer = (e) => {
    setTimer("00:10:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 600);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const [pageIndex, setPageIndex] = useState(0);
  const [answered, setAnswered] = useState({});
  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    `http://localhost:3000/api/quiz?page=${pageIndex}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { quiz, next, prev } = data;

  const addAnswer = (e: React.FormEvent<HTMLInputElement>): void => {
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
          {parseInt(data.page) + 1} of {data.total}
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
                onChange={addAnswer}
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

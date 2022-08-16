import Link from 'next/link';
import useSWR from 'swr'
import styles from '../styles/Quiz.module.css'

export default function Result() {
  const getAnswers = typeof window !== 'undefined' && localStorage.getItem('quiz');
  const answers = JSON.parse(getAnswers);
  const fetcher = (...args: any) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(`./api/quiz`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  let correctAnswers = 0;
  if (data) {
    data.map(quiz => {
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
      <h2>You answered {correctAnswers} questions correctly. You {correctAnswers > ((data.length / 100) * 70) ? 'Passed 😃' : 'Failed 🥺'} </h2>
      <br />

      {data.map(quiz => (
        <>
          <div key={quiz.id}>
            <p>{quiz.question}</p>
          </div>
          <ul className={styles.ul}>
            {quiz.options.map((option: string, i: number) => (
              <li className={styles.option} key={i}>
                {
                  option === quiz.answer ? (
                    quiz.answer === answers[quiz.id] ? (
                      <span>{option} &nbsp; ✅</span>
                    ) : (
                      <span>{option}</span>
                    )
                  ) : (
                    answers[quiz.id] === option ? (
                      <><s>{option}</s> &nbsp;❌</>
                    ) : (
                      <s>{option}</s>
                    )
                  )
                }
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  )
}

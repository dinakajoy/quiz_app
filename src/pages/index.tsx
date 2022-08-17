import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  typeof window !== "undefined" && window.localStorage.setItem("quiz", JSON.stringify({}));
  return (
    <div className={styles.homeWrapper}>
      <p className={styles.description}>Welcome &nbsp; 👋</p>
      <p className={styles.description}>This is a programming quiz to test your knowledge on basic programming concepts, fundamentals of computer science and software engineering. You can retake as many time as you desire.</p>
      <p className={styles.description}>You have four options to choose one. The quiz takes 10 minutes to complete. Results will be displayed once you submit or once the quiz times out.</p>
      <p className={styles.description}>Goodluck!!! &nbsp; 💪🏻 &nbsp; 💪🏻 &nbsp; 💪🏻</p>
      <Link href="/quiz">
        <a className={styles.startBtn}>Start Quiz</a>
      </Link>
    </div>
  )
}

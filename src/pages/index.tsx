import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Qiuz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to Quiz
        </h1>
        <p>You have four options to choose one. The quiz takes ten minutes to complete. Failure to finish in ten minutes means you have failed. Results will be displayed once you submit or once the quiz times out</p>
        <Link href="/quiz">
          <a>Start Quiz</a>
        </Link>
      </main>

      <footer>
        <a
          href="https://dinakajoy.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Odinaka Joy
        </a>
      </footer>
    </div>
  )
}

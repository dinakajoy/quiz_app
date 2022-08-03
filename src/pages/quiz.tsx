import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'

export default function Quiz() {
  const [pageIndex, setPageIndex] = useState(0);
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error } = useSWR(`http://localhost:3000/api/quiz?page=${pageIndex}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('pageIndex', pageIndex);
  console.log('data', data);
  const quiz = data.quiz;

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
        <div>
          <div key={quiz.id}>
          <p>{quiz.question}</p>
          </div>
        </div>
        {data.prev && <button onClick={() => setPageIndex(pageIndex - 1)}>Previous Question</button>}
        {data.next && <button onClick={() => setPageIndex(pageIndex + 1)}>Next Question</button>}
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

// File: app/HomeClient.jsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../styles/Home.module.css'
import theme from '../styles/theme'

export default function HomePage({ exams }) {
  const router = useRouter()

  useEffect(() => {
    theme.forEach((color, idx) => {
      document.documentElement.style.setProperty(`--color${idx + 1}`, color)
    })
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          <span className={styles.bold}>Welcome to <u>exam prep</u></span>
        </h1>
      </header>
      <main className={styles.main}>
        {exams.map((exam) => (
          <section key={exam.subject} className={styles.examBox}>
            <div className={styles.examTitle}>{exam.subject}</div>
            <div className={styles.examContent}>
              {exam.years.map((year) => (
                <div key={year.year} className={styles.yearBlock}>
                  <div className={styles.yearLabel}>{year.year}</div>
                  <div className={styles.partsRow}>
                    {year.sections.map((sectionObj) => (
                      <button
                        key={sectionObj.section}
                        className={styles.partBtn}
                        onClick={() => router.push(`/${sectionObj.display_code}/info`)}
                      >
                        {sectionObj.section}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        <button className={styles.loginBtn} onClick={() => router.push('/practice')}>
          Attempt questions sorted by topic
        </button>
      </main>
    </div>
  )
}
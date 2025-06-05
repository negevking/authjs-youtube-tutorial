// File: app/HomeClient.jsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import theme from '../styles/theme'

export default function HomePage({ exams }) {

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
                      <Link href={`/${sectionObj.display_code}`} className={styles.partBtn}>
                        {sectionObj.section}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        {/* UPDATE BUTTON STYLING FOR PRACTICE MODE */}
        <button className={styles.loginBtn}>
          <Link href={`/practice}`}>Attempt questions sorted by topic</Link>
        </button>
      </main>
    </div>
  )
}
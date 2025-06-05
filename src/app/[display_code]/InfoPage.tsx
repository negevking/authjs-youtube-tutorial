'use client';

import Link from 'next/link';
import styles from '../../styles/Info.module.css';

export default function PaperInfoPage({ exam, display_code }) {

  return (
    <div className={styles.container}>
      {exam ? (
        <>
          <div className={styles.header}>
            <h1 className={styles.bold}>
              {exam.subject} {exam.year} {exam.section}
            </h1>
            <p>Time limit: {exam.time_limit}</p>
            <p>Calculator: {exam.calculator_allowed ? 'Yes' : 'No'}</p>
          </div>

          <div className={styles.main}>
            <div className={styles.examBox}>
              <div className={styles.examTitle}>Launch Exam Mode</div>
              <div className={styles.examContent}>
                <p>
                  You will answer all questions under timed conditions, with no feedback until the
                  end. Perfect for simulating real test conditions.
                </p>
                <Link href={`/${display_code}/exam`} className={styles.partBtn}>
                    Start Exam Mode
                </Link>
              </div>
            </div>

            <div className={styles.examBox}>
              <div className={styles.examTitle}>Launch Practice Mode</div>
              <div className={styles.examContent}>
                <p>
                  Practice each question at your own pace, with optional hints, worked solutions,
                  and the ability to check or retry questions.
                </p>
                <Link href={`/${display_code}/practice`} className={styles.partBtn}>
                    Start Practice Mode
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
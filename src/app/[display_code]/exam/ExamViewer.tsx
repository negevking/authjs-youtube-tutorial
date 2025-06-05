// File: pages/[display_code]/ExamSimulator.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Exam.module.css'
import QuestionViewer from '@/src/components/QuestionViewer'
import ReviewPane from '@/src/components/ReviewPane'

export default function ExamSimulator({ questions, exam }) {
  const router = useRouter()
  const mode = router.query.mode || 'exam'
  const isPractice = mode === 'practice'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [checked, setChecked] = useState(false)
  const [showCorrect, setShowCorrect] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timeLeft, setTimeLeft] = useState(exam.time_limit * 60)
  const timerRef = useRef()

  //timer setup. In practice mode, we track elapsed time, in exam mode we track time left
useEffect(() => {
  if (isPractice) {
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
  } else {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return () => clearInterval(timerRef.current)
}, [isPractice])

  const currentQuestion = reviewMode
    ? questions[reviewIndex]
    : questions[currentIndex]

  function handleSelect(answerId) {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }))
    setChecked(false)
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartReview = (index) => {
    setReviewIndex(index)
    setReviewMode(true)
    setChecked(false)
    setShowCorrect(false)
  }

  return (
    <div className={styles.container}>
      {!submitted && (
      <div className={styles.timer}>
        {isPractice ? (
          <>Time elapsed: <strong>{formatTime(elapsedTime)}</strong></>
        ) : (
          <>Time remaining: <strong>{formatTime(timeLeft)}</strong></>
        )}
      </div>
    )}

      {!submitted ? (
        <QuestionViewer
          question={currentQuestion}
          selectedAnswer={responses[currentQuestion.id]}
          onSelect={handleSelect}
          onNext={async () => {
            await saveResponse()
            setCurrentIndex(i => i + 1)
            setChecked(false)
            setShowCorrect(false)
          }}
          onPrevious={async () => {
            await saveResponse()
            setCurrentIndex(i => i - 1)
            setChecked(false)
            setShowCorrect(false)
          }}
          onSubmit={async () => {
            await saveResponse()
            handleSubmitExam()
          }}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          disablePrevious={currentIndex === 0}
          isLast={currentIndex === questions.length - 1}
          showCheck={isPractice}
          showReveal={isPractice}
          showWorkedSolution={isPractice}
          onCheck={() => setChecked(true)}
          onReveal={() => setShowCorrect(prev => !prev)}
          isChecked={checked}
          showCorrect={showCorrect}
        />
      ) : submitted && score && reviewMode ? (
        
        <ReviewPane
          exam={exam}
          score={score}
          questions={questions}
          responses={responses}
          reviewIndex={reviewIndex}
          setReviewIndex={setReviewIndex}
          setReviewMode={setReviewMode}
          setChecked={setChecked}
          setShowCorrect={setShowCorrect}
          showCorrect={showCorrect}
          checked={checked}
          handleSelect={handleSelect}
        />
      ) : submitted ? (
        <p className={styles.questionText}>Scoring your exam...</p>
      ) : null}
    </div>
  )
}



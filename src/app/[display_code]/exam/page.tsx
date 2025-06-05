import { query } from '../../lib/db'

async function saveResponse() {
    const qid = questions[currentIndex].id
    const aid = responses[qid]
    //if (!aid) return
    // we want to store the response even if no answer is selected so we can track unattempted questions
    await fetch('/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionIdRef.current,
        question_id: qid,
        answer_id: aid
      })
    })
  }

async function handleSubmitExam() {
    const timeTaken = isPractice ? elapsedTime : exam.time_limit * 60 - timeLeft
    clearInterval(timerRef.current)
    setSubmitted(true)
    const res = await fetch(`/api/responses?session_id=${sessionIdRef.current}&exam_id=${exam.id}&time_taken=${timeTaken}`)
    const data = await res.json()
    setScore(data)
    handleStartReview(0)
  }

export async function getServerSideProps({ params }) {
  const { display_code } = params

  const examRows = await query(
    `SELECT id, subject, year, section, calculator_allowed, time_limit FROM exams WHERE display_code = $1`,
    [display_code]
  )
  const exam = examRows[0]

  const q = await query(`
    SELECT q.id, q.question_html, q.question_number, q.diagram_url, a.id AS answer_id, a.answer_html, a.display_order, a.is_correct
    FROM questions q
    JOIN answers a ON q.id = a.question_id
    WHERE q.exam_id = $1
    ORDER BY q.question_number ASC, a.display_order ASC
  `, [exam.id])

  const grouped = {}
  for (let row of q) {
    if (!grouped[row.id]) {
      grouped[row.id] = {
        id: row.id,
        question_text: row.question_html, 
        question_number: row.question_number,
        diagram: row.diagram_url,
        choices: []
      }
    }
    grouped[row.id].choices.push({
      id: row.answer_id,
      text: row.answer_html,
      label: String.fromCharCode(65 + row.display_order),
      is_correct: row.is_correct
    })
  }

  const questions = Object.values(grouped)

  return {
    props: {
      questions,
      exam: {
        ...exam,
        time_limit: parseInt(exam.time_limit) || 60
      }
    }
  }
}
import HomePage from './HomeClient'
import { query } from '../lib/db'

export default async function Page() {
  const examsRaw = await query(`
    SELECT subject, year, section, display_code
    FROM exams
    ORDER BY subject, year, section
  `)

  const examsMap = {}
  examsRaw.forEach(({ subject, year, section, display_code }) => {
    if (!examsMap[subject]) examsMap[subject] = {}
    if (!examsMap[subject][year]) examsMap[subject][year] = []
    examsMap[subject][year].push({ section, display_code })
  })

  const exams = Object.entries(examsMap).map(([subject, yearsObj]) => ({
    subject,
    years: Object.entries(yearsObj).map(([year, sectionsArr]) => ({
      year,
      sections: sectionsArr
    }))
  }))

  return <HomePage exams={exams} />
}
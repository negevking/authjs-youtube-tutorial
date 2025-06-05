import PaperInfoPage from './InfoPage';
import { NextResponse } from 'next/server';
// import { query } from '@src/lib/db';
import { query } from 'C:/Users/bensi/Documents/Github/authjs-youtube-tutorial/src/lib/db';


export default async function Page({ params }) {
    const { display_code } = params;

    const examRows = await query(
    `SELECT id, subject, year, section, calculator_allowed, time_limit FROM exams WHERE display_code = $1`,
    [display_code]
    );

    const exam = examRows[0] || null;

    return <PaperInfoPage exam={exam} display_code={display_code} />;
}
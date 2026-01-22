import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';

// GET: Fetch published reviews for the website
export async function GET() {
    try {
        await dbConnect();
        const reviews = await Feedback.find({ status: 'published' }).sort({ date: -1 });
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

// POST: Submit new feedback from the website
export async function POST(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();
        const newFeedback = await Feedback.create({
            ...body,
            status: 'pending',
        });
        return NextResponse.json(newFeedback, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}

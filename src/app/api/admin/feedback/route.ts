import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';
import bcrypt from 'bcryptjs';

// GET: Fetch all feedback for admin portal
export async function GET() {
    try {
        await dbConnect();
        const feedback = await Feedback.find({}).sort({ date: -1 });
        return NextResponse.json(feedback);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
    }
}

// POST: Secure Login Check
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const ALLOWED_EMAIL = process.env.ALLOWED_ADMIN_EMAIL || 'ziad46333@gmail.com';
        const HASHED_PASSWORD_ENV = process.env.ADMIN_PASSWORD_HASH;

        if (email !== ALLOWED_EMAIL) {
            return NextResponse.json({ error: 'Unauthorized email' }, { status: 401 });
        }

        if (!HASHED_PASSWORD_ENV) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const isMatch = await bcrypt.compare(password, HASHED_PASSWORD_ENV);

        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}

// PATCH: Toggle feedback status (pending/published)
export async function PATCH(request: Request) {
    try {
        const { id } = await request.json();
        await dbConnect();
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }
        feedback.status = feedback.status === 'published' ? 'pending' : 'published';
        await feedback.save();
        return NextResponse.json(feedback);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }
}

// DELETE: Remove feedback
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        await dbConnect();
        await Feedback.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
    }
}

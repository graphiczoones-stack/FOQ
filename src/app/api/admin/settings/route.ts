import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Settings from '@/models/Settings';

// GET: Fetch current settings
export async function GET() {
    try {
        await dbConnect();
        let settings = await Settings.findOne({});

        // Initialize settings if they don't exist
        if (!settings) {
            settings = await Settings.create({ isDownloadEnabled: true });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

// PATCH: Update settings
export async function PATCH(request: Request) {
    try {
        const { isDownloadEnabled } = await request.json();

        if (typeof isDownloadEnabled !== 'boolean') {
            return NextResponse.json({ error: 'Invalid value for isDownloadEnabled' }, { status: 400 });
        }

        await dbConnect();
        let settings = await Settings.findOne({});

        if (!settings) {
            settings = await Settings.create({ isDownloadEnabled });
        } else {
            settings.isDownloadEnabled = isDownloadEnabled;
            settings.updatedAt = new Date();
            await settings.save();
        }

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}

import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    isDownloadEnabled: boolean;
    updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
    isDownloadEnabled: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now }
});

// Always use the same document for settings (singleton pattern in DB)
export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

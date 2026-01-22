import mongoose, { Schema, model, models } from 'mongoose';

const FeedbackSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    status: {
        type: String,
        enum: ['pending', 'published'],
        default: 'pending',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Feedback = models.Feedback || model('Feedback', FeedbackSchema);

export default Feedback;

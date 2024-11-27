import mongoose from 'mongoose'

const TestSeriesSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    testSeries: [
        {
            name: { type: String, required: true },
            questions: { type: Number, required: true },
            totalMarks: { type: Number, required: true },
            duration: { type: String, required: true },
            language: { type: String, required: true },
            syllabus: { type: String, required: true }
        }
    ]
});

const TestSeries = mongoose.model("test_series", TestSeriesSchema);

export default TestSeries;
import TestSeries from "../models/TestSeries.js"

export const testSeriesController = async (req, res) => {
    const { subject } = req.query;
    console.log('Searching for:', subject);

    try {
        // Check if the subject is 'All Subjects' and adjust the query accordingly
        const query = subject === 'All Subjects' ? {} : { subject: subject };

        // Fetch the test series based on the query
        const data = await TestSeries.find(query);
        console.log('Query result:', data);

        if (!data || data.length === 0) {
            return res.status(404).send([]);
        }

        res.json(data);
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

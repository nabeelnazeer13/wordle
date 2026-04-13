const app = require('./app.js');
const connectDB = require('./db/db.js');

const PORT = 5080;
async function startServer() {
    try {      
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}
startServer();
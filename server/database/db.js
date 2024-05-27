const mongoose = require('mongoose');

const Connection = async (URL) => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database Connected successfully...`);
    } catch (error) {
        console.log(`Error while connecting with the database: ${error}`);
        // Throw the error to handle it in the caller if needed
        // throw error;
    }
};




module.exports = Connection;
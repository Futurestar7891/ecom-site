const mongoose = require('mongoose');
const dotenv=require("dotenv");
dotenv.config({path:"backend/config/config.env"})
const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');

        // const connectmenucollection = mongoose.connection.db.collection('menu');

        // try {
        //     const fooddata = await connectmenucollection.find({}).toArray();
        //     global.menu = fooddata;
        //     const connectcatagorycollection = mongoose.connection.db.collection('catagory');

        //     try {
        //         const catdata = await connectcatagorycollection.find({}).toArray();
        //         global.catagory = catdata;
        //     } catch (error) {
        //         console.error(`Error fetching data: ${error}`);
        //     }
        // } catch (error) {
        //     console.error(`Error fetching data: ${error}`);
        // }
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`);
    }
};

module.exports = connection;
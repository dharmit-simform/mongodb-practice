import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes.js";

// Swagger UI
import swaggerUi from 'swagger-ui-express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("../swagger_output.json");

// Accessing content from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection using Mongoose
try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        UseUnifiedTopology: true
    });
    console.log("Connected to db");
} catch (error) {
    console.log(error);
}

app.use('/', router);

// API Documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
    console.log(`App Listening on http://localhost:${PORT}`);
});
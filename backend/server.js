import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import daleRoute from './routes/daleRoute.js';
import artworkSaveRoute from './routes/artworkSaveRoute.js';
import userRoute from './routes/userRoute.js';
import supportRoute from './routes/supportRoute.js';
import klaviyoRoute from './routes/klaviyoRoute.js';
import adminRoute from './routes/adminRoute.js';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import path from 'path';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKeyPath = path.join(__dirname, 'ssl', 'privateKey.pem');
const certificatePath = path.join(__dirname, 'ssl', 'certificate.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const isLocal = process.env.NODE_ENV !== 'production';

const corsOptions = {
  origin: `${process.env.CORS_ORIGIN}`, 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}`)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(cors(corsOptions))

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({
  limit: "50mb", 
  extended: true, 
  parameterLimit:50000
}));

app.use(bodyParser.text({ limit: '200mb' }));

app.use('/api/dale'         , daleRoute           );
app.use('/api/artworkSave'  , artworkSaveRoute    );
app.use('/api/support'      , supportRoute        );
app.use('/api/user'         , userRoute           );
app.use('/api/klaviyo'      , klaviyoRoute        );
app.use('/api/admin'        , adminRoute        );

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

if (isLocal) {

  http.createServer(credentials, app).listen (process.env.PORT || 5001, () => {
    console.log (`Server started at PORT:${process.env.PORT}`)
  });

} else {
  http.createServer(app).listen (process.env.PORT || 80, () => {
  console.log (`Server started at PORT:${process.env.PORT}`)
});
};
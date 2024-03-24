import {create} from 'ipfs-http-client';
const ipfs = create('http://127.0.0.1:5001');

import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import formidable, {errors as formidableErrors} from 'formidable';
import fs from 'fs';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.post('/api/upload', (req, res, next) => {
    const form = formidable({});
  
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        
        const file = files.file[0];
        const fileBuffer = fs.readFileSync(file.filepath);
        try {
            const result = await ipfs.add(fileBuffer);
            fs.unlinkSync(file.filepath);
            console.log(result);
            // run_contract(result);
            res.status(200).json("Uploaded successfully!");
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`));
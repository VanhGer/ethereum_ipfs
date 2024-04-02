import {create} from 'ipfs-http-client';
import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import formidable, {errors as formidableErrors} from 'formidable';
import fs from 'fs';
import {storeFile, getFile} from "./contract.js";
const IPFS_API_PORT = process.env.IPFS_API_PORT || 5005
const ipfs = create(`http://127.0.0.1:${IPFS_API_PORT}`);


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

    // console.log(name);
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const file_name = fields.name[0];
        const file = files.file[0];
        const fileBuffer = fs.readFileSync(file.filepath);
        try {
            const result = await ipfs.add(fileBuffer);
            // console.log(result.path);
            // res.status(200).json("Uploaded successfully!");
            try {
                await storeFile(file_name, result.path);
                res.status(200).json("Uploaded successfully!");
            } catch (error) {
                console.error('Transaction Error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.get('/api/getStore', async (req, res) => {

    try {
        let cur = await getFile();
        console.log(cur[0]);
        const result = cur.map(item => {
            return {
                name: item[0],
                cid: item[1]
            };
        });
        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.error('Transaction Error:', error);
        res.status(500).json({error: 'Transaction Error'});
    }

    // let tmp = [{
    //     "name": "bai1",
    //     "cid": "Qme4u9HfFqYUhH4i34ZFBKi1ZsW7z4MYHtLxScQGndhgKE"
    // },]
    // res.status(200).json(tmp);
});

app.listen(PORT, () => console.log(`Your server is running successfully on port ${PORT}`));
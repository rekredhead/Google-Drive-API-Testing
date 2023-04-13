const express = require('express');
const stream = require('stream');
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');

const router = express.Router();
const upload = multer(); // Initialize upload middleware

// Create a service account and enabled Google Drive API in it
const keyFilePath = path.join(__dirname + "/credentials.json");
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Authenticate the service account
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: SCOPES
});

const uploadFileToDrive = async(fileObject, userId) => {
    // bufferStream turns the file into smaller chunks/packages
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    
    // Initialize instance of Google Drive
    const drive = await google.drive({ version: 'v3', auth });

    // Request to upload file stream to google drive 
    const response = await drive.files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: `pension_user${userId}`, // Use text input from user to set name of the file
            parents: ['1ox12vNfM6UvrSXK_GvxLidapC-bkdcQe'] // Google Drive Folder id
        },
        fields: "id,name"
    });
    
    const { data } = response;
    console.log(`Filed successfully uploaded: ${data.name}`);
}

router.post('/upload', (req, res) => {
    // 'myFile' is the name of the input from the HTML form
    upload.single('myFile')(req, res, (err) => {
        if (err) throw err;
        
        uploadFileToDrive(req.file, req.body.id);
        res.status(200).json({
            message: 'File uploaded successfully',
        });
    });
});

module.exports = router;
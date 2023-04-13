- This is a reference for myself and anyone else to get files from an HTML page and upload them to Google Drive

# Create A Google Service with Google Drive API enabled
- Go to console.cloud.google.com
- Create a new Google Cloud Project
- Go to APIs & Services > Enable APIS and Services
- Search for the Google Drive API and Enable it
- Go to APIs & Services > Credentials
- Create a new service account
- Click on the new service account and Go to 'Keys' Tab
- Create a new key as a JSON file
- Once downloaded, rename it as 'credentials.json'

# Start this application
- Clone this repository
- Put the 'credentials.json' file in the directory of this project
- Install the modules using:
```
npm install express multer googleapis@105 @google-cloud/local-auth@2.1.0 dotenv
```
- Create a New Folder in your Google Drive
- Give 'Editor' access to the service account that you created
- Copy the ID of the Folder which is the URL of the folder
- Create a .env file in the main directory and add the following:
```
PORT=<an-available-port-in-your-device>
GOOGLEDRIVEFOLDERID='<id-of-the-folder-in-your-google-drive>'
```
- Run the application using:
```
npm start
```
const { google } = require('googleapis');
const { promisify } = require('util');
const fs = require('fs');
const { GoogleAuth } = require('google-auth-library');
const serviceAccountKeyPath = './src/google_service_acc.json'; // Replace with the path to your service account key file

async function markCheckbox() {
    const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath));

  const client = new google.auth.JWT(
    serviceAccountKey.client_email,
    null,
    serviceAccountKey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  const auth = promisify(client.authorize).bind(client);
  await auth();
console.log(auth)
//   const sheets = google.sheets({ version: 'v4', auth });

//   const spreadsheetId = 'grg'; // Replace with the actual spreadsheet ID
//   const sheetName = 'Lapas1'; // Replace with the actual sheet name
//   const range = `${sheetName}!A1:A1`; // Replace with the cell range containing the checkbox

//   const requestBody = {
//     requests: [
//       {
//         updateCells: {
//           range: {
//             sheetId: 0, // 0 represents the first sheet
//             startRowIndex: 0, // Start row index of the range
//             endRowIndex: 1, // End row index of the range
//             startColumnIndex: 0, // Start column index of the range
//             endColumnIndex: 1, // End column index of the range
//           },
//           fields: 'userEnteredValue',
//           rows: [
//             {
//               values: [
//                 {
//                   userEnteredValue: {
//                     boolValue: true, // Set to true to mark the checkbox
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     ],
//   };

//   try {
//     const response = await sheets.spreadsheets.batchUpdate({
//       spreadsheetId,
//       requestBody,
//     });

//     console.log('Checkbox marked successfully:', response.status);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
}

markCheckbox();



async function authorizeWithServiceAccount() {
    try {
      // Create a new GoogleAuth instance
      const auth = new GoogleAuth();
  
      // Specify the path to your service account key file
      const keyPath = './src/google_service_acc.json';
  
      // Create a client with the specified credentials
      const client = await auth.getClient({
        keyFile: keyPath,
        scopes: 'https://www.googleapis.com/auth/cloud-platform' // Specify the required scopes based on your needs
      });
  
      // Check if the service account credentials are valid
      const token = await client.getAccessToken();
      console.log('Service account authorized successfully:');
      console.log(`Access token: ${token.token}`);
  
      // Now you can use the authorized client to perform actions using Google Cloud APIs
      // For example, you can make API requests using the client object
  
      // ...
  
    } catch (error) {
      console.error('Error authorizing service account:', error);
    }
  }
  
  // Call the function to authorize with the service account
//   authorizeWithServiceAccount();
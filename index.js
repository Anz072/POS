const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Import endpoint functions
const pdfModifier = require('./src/pdfmodifier');
// const adobe = require('./src/adobe');
app.use(express.json());

app.post('/retrieve_field_names', pdfModifier.getFieldInfo);
app.post('/post_answers', pdfModifier.createNewPdfInstance);
// app.post('/post_answers_to_new', pdfModifier.createNewUpdatedPdfInstance);
app.post('/flattenxfa', pdfModifier.flattenPDF);
app.post('/downloadandfield', pdfModifier.getFieldInfoDynamic);
app.post('/downloadandfieldNew', pdfModifier.getFieldInfoDynamicNew);
// app.post('/adobeConvert', adobe.convertPDFToDOCXAndThenToPDF);

app.get('/test_endpoint', async (req, res) => {
    res.send("App is live!")
  });

app.listen(port, () => {
  console.log('Server started on port 3000');
});
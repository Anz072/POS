// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/exportpdf/get-pdf-properties.js
// const pdftk = require('pdftk');
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
// const pdftk = require('node-pdftk');
// const path = require('path');
const convertPDFToDOCXAndThenToPDF = async () => {
  try {
    // Initial setup, create credentials instance.
    const credentials = PDFServicesSdk.Credentials
      .servicePrincipalCredentialsBuilder()
      .withClientId("09fe699311e84cd5bcd9fe3f2f312dea")
      .withClientSecret("p8e-AGMDJVDk8s2gm2POyyRDsi2x8GEqw5Dv")
      .build();

    // Create an ExecutionContext using credentials and create new operation instances.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
    const exportPDF = PDFServicesSdk.ExportPDF;
    const exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.DOCX);
    const createPDF = PDFServicesSdk.CreatePDF;
    const createPdfOperation = createPDF.Operation.createNew();

    // Set operation input from the source PDF file
    const inputPDF = PDFServicesSdk.FileRef.createFromLocalFile('./PDF_Form/xfapdf.pdf');
    exportPdfOperation.setInput(inputPDF);

    // Execute the export PDF operation and save the result as a DOCX file
    const docxResult = await exportPdfOperation.execute(executionContext);
    await docxResult.saveAsFile('./output.docx');
    console.log('dooooooooooooooone')
    // Set the DOCX file as the input for the create PDF operation
    const inputDOCX = PDFServicesSdk.FileRef.createFromLocalFile('./output.docx');
    createPdfOperation.setInput(inputDOCX);

    // Execute the create PDF operation and save the result as a PDF file
    const pdfResult = await createPdfOperation.execute(executionContext);
    await pdfResult.saveAsFile('./axoutput.pdf');

    console.log('PDF to DOCX to PDF conversion completed successfully.');
  } catch (err) {
    console.log('Exception encountered while executing operation:', err);
  }
};

// pdftk.configure({
//     bin: `C:/Program Files/PDFtk/bin/pdftk.exe`,
//     Promise: require('bluebird'),
//     ignoreWarnings: true,
//     tempDir: 'C:/Users/Rokas/OneDrive/Documents'
// });

// pdftk.input('./axoutput.pdf').stamp('./logo.pdf').output().then(buffer => {
//         // Do stuff with the output buffer
//         console.log('reeeeeeeeeeeee')
//     }).catch(err => {
//         // handle errors
//         console.log('meeeesad')
//     });
//     console.log('dooooooooooooooone')

// pdftk.input('PDF_Form/xfapdf.pdf').dropXfa().output('output.pdf').then(buffer => {
//     // The XFA has been removed, and the modified PDF is available as 'output.pdf'.
//     console.log('XFA removed successfully.');
//   })
//   .catch(error => {
//     console.error('An error occurred:', error);
//   });
// // convertPDFToDOCXAndThenToPDF();
  // Export functions to index
  module.exports = {
    convertPDFToDOCXAndThenToPDF
  }; 
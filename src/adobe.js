// // Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// // Run the sample:
// // node src/exportpdf/get-pdf-properties.js
// // const pdftk = require('pdftk');
// const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
// const pdftk = require('node-pdftk');
// const Promise = require('bluebird');
// const fs = require ('fs');
// const { PDFDocument, PDFTextField, PDFCheckBox, PDFSignature, PDFRadioGroup } = require('pdf-lib');
// const convertPDFToDOCXAndThenToPDF = async () => {
//   try {
//     // Initial setup, create credentials instance.
//     const credentials = PDFServicesSdk.Credentials
//       .servicePrincipalCredentialsBuilder()
      // .withClientId("09fe699311e84cd5bcd9fe3f2f312dea")
      // .withClientSecret("p8e-AGMDJVDk8s2gm2POyyRDsi2x8GEqw5Dv")
//       .build();

//   //   // Create an ExecutionContext using credentials and create new operation instances.
//   //   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
//   //   const exportPDF = PDFServicesSdk.ExportPDF;
//   //   const exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.PNG);
//   //   const createPDF = PDFServicesSdk.CreatePDF;
//   //   const createPdfOperation = createPDF.Operation.createNew();

//   //   // Set operation input from the source PDF file
//   //   const inputPDF = PDFServicesSdk.FileRef.createFromLocalFile('./PDF_Form/xfapdf.pdf');
//   //   exportPdfOperation.setInput(inputPDF);

//   //   // Execute the export PDF operation and save the result as a DOCX file
//   //   const docxResult = await exportPdfOperation.execute(executionContext);
//   //   await docxResult.saveAsFile('./output.png');
//   //   console.log('dooooooooooooooone')
//   //   // Set the DOCX file as the input for the create PDF operation
//   //   const inputDOCX = PDFServicesSdk.FileRef.createFromLocalFile('./output.png');
//   //   createPdfOperation.setInput(inputDOCX);

//   //   // Execute the create PDF operation and save the result as a PDF file
//   //   const pdfResult = await createPdfOperation.execute(executionContext);
//   //   await pdfResult.saveAsFile('./axoutput.pdf');

//   //   console.log('PDF to DOCX to PDF conversion completed successfully.');
//   // } catch (err) {
//   //   console.log('Exception encountered while executing operation:', err);
//   // }
//   // Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// // Run the sample:
// // node src/exportpdf/export-pdf-to-docx.js
//   //Create an ExecutionContext using credentials and create a new operation instance.
//   const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);
//   const exportPDF = PDFServicesSdk.ExportPDF;
//   const exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.RTF);
//   const input = PDFServicesSdk.FileRef.createFromLocalFile('./PDF_Form/xfapdf.pdf');
//   exportPdfOperation.setInput(input);
//   // exportPdfOperation.setTargetFormat(exportPDF.SupportedTargetFormats.PNG);
//   exportPdfOperation.execute(executionContext)
//     .then(result => result.saveAsFile('./exportPdfOutput.rtf'))
//     .catch(err => {
//       if (err instanceof PDFServicesSdk.Error.ServiceApiError || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
//         console.log('Exception encountered while executing operation', err);
//       } else {
//         console.log('Exception encountered while executing operation', err);
//       }
//     });
//   }catch(e){
//   }
// };

// // pdftk.configure({
// //     bin: `C:/Program Files/PDFtk/bin/pdftk.exe`,
// //     Promise: require('bluebird'),
// //     ignoreWarnings: true,
// //     tempDir: 'C:/Users/Rokas/OneDrive/Documents'
// // });

// // pdftk.input('./PDF_Form/xfapdf.pdf').output().then(buffer => {
// //         // Do stuff with the output buffer
// //         console.log('reeeeeeeeeeeee')
// //         console.log(buffer);
// //           abc(buffer);
// //     }).catch(err => {
// //         // handle errors
// //         console.log('meeeesad')
// //     });
// //     console.log('dooooooooooooooone')

// // // pdftk.input('PDF_Form/xfapdf.pdf').dropXfa().output('output.pdf').then(buffer => {
// // //     // The XFA has been removed, and the modified PDF is available as 'output.pdf'.
// // //     console.log('XFA removed successfully.');
// // //   })
// // //   .catch(error => {
// // //     console.error('An error occurred:', error);
// // //   });
// convertPDFToDOCXAndThenToPDF();
// //   // Export functions to index
// //   async function abc(buffer){
// //     const pdfDoc = await PDFDocument.load(buffer);
// //     const form = pdfDoc.getForm();
// //     const pageCount = pdfDoc.getPageCount();
// //     console.log('reeeeeeeeeesseee')
// //     console.log(pageCount)
// //     console.log('reeeeeeeeeesseee')
// //     const flattenedPdfBytes = pdfDoc.save();
// //     console.log(form)
// // fs.writeFileSync('./outxssssxpust.pdf', flattenedPdfBytes);

// //   }
//   module.exports = {
//     convertPDFToDOCXAndThenToPDF
//   }; 


/*
 * Copyright 2019 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
/**
 * This sample illustrates how to extract Text Information from PDF.
 * <p>
 * Refer to README.md for instructions on how to run the samples & understand output zip file.
 */
try {
    // Initial setup, create credentials instance.
    const credentials =  PDFServicesSdk.Credentials
        .servicePrincipalCredentialsBuilder()
        .withClientId("09fe699311e84cd5bcd9fe3f2f312dea")
        .withClientSecret("p8e-AGMDJVDk8s2gm2POyyRDsi2x8GEqw5Dv")
        .build();

    // Create an ExecutionContext using credentials
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

    // Build extractPDF options
    const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
        .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT).build()

    // Create a new operation instance.
    const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
        input = PDFServicesSdk.FileRef.createFromLocalFile(
            './PDF_Form/xfapdf.pdf',
            PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
        );

    // Set operation input from a source file.
    extractPDFOperation.setInput(input);

    // Set options
    extractPDFOperation.setOptions(options);

    //Generating a file name
    let outputFilePath = createOutputFilePath();

    extractPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile(outputFilePath))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });

    //Generates a string containing a directory structure and file name for the output file.
    function createOutputFilePath() {
        let date = new Date();
        let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + "-" +
            ("0" + date.getMinutes()).slice(-2) + "-" + ("0" + date.getSeconds()).slice(-2);
        return ("output/ExtractTextInfoFromPDF/extract" + dateString + ".zip");
    }

} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
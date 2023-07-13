const fs = require ('fs');
const { PDFDocument, PDFTextField, PDFCheckBox, PDFSignature, PDFRadioGroup } = require('pdf-lib');
const request = require('request');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Function used to retrieve field names & types of PDFs in PDF Form. Returns a JSON file.
  const getFieldInfo = async (req,res) => {
    try {
      const pdfBytes = fs.readFileSync('./PDF_Form/FINAL.pdf');
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
  
      const fieldTypes = fields.map(field => {
        const fieldName = field.getName();
        let fieldType;
        switch (true) {
          case field instanceof PDFTextField:
            fieldType = 'Text';
            break;
          case field instanceof PDFCheckBox:
            fieldType = 'Checkbox';
            break;
          case field instanceof PDFSignature:
            fieldType = 'Signature';
            break;
          case field instanceof PDFRadioGroup:
            fieldType = 'RadioGroup';
            break;
          default:
            fieldType = 'Unknown';
        }
        return { fieldName, fieldType };
      });
      res.send(fieldTypes);
    } catch (error) {
      res.send(error);
    }
  };

  const downloadPdf = async (url) => {
    try {
      console.log("url")
      console.log(url)
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      let destination = "./temp/" + uuidv4() + ".pdf";
      // Save the PDF file
      fs.writeFileSync(destination, response.data);
      return destination;
    } catch (error) {
      console.error('An error occurred while downloading the PDF file:');
    }
  };
  

  const getFieldInfoDynamic = async (req,res) => {
    try {
      let {fileUrl} = req.body;
      let downloadedPDFFile = await downloadPdf(fileUrl);
      const pdfBytes = fs.readFileSync(downloadedPDFFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();
  
      const fieldTypes = fields.map(field => {
        const fieldName = field.getName();
        let fieldType;
        switch (true) {
          case field instanceof PDFTextField:
            fieldType = 'Text';
            break;
          case field instanceof PDFCheckBox:
            fieldType = 'Checkbox';
            break;
          case field instanceof PDFSignature:
            fieldType = 'Signature';
            break;
          case field instanceof PDFRadioGroup:
            fieldType = 'RadioGroup';
            break;
          default:
            fieldType = 'Unknown';
        }
        return { fieldName, fieldType };
      });
      res.send(fieldTypes);
    } catch (error) {
      res.send(error);
    }
  };

  // Function used to post answers to form fields & create a new pdf copy with the answers
  const createNewPdfInstance = async (req,res) => {
    let {Cluster} = req.body;
    const pdfBytes = fs.readFileSync('./PDF_Form/FINAL2.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    fields.forEach(field => {
        let name = field.getName();
        let matchingObject = Cluster.find(obj => obj.fieldName === name);
        if(matchingObject != undefined){
          if(matchingObject.fieldType == "Text"){
            let textField = form.getTextField(matchingObject.fieldName);
            let isMultiline = textField.isMultiline();
            if(isMultiline == true){
                textField.setFontSize(12);
            }
            textField.setText(matchingObject.Answer);
        }else if(matchingObject.fieldType == "Checkbox"){
            let checkBox = form.getCheckBox(matchingObject.fieldName)
            if(matchingObject.Answer == "true"){
                checkBox.check()
            }
        }else if(matchingObject.fieldType == "RadioGroup"){
            let radioGroup = form.getRadioGroup(matchingObject.fieldName)
            if(matchingObject.Answer == "true"){
                radioGroup.select("Yes");
            }else{
                radioGroup.select("No");
            }
        }
        }
    });
    form.flatten();
    const modifiedPdfBytes = await pdfDoc.save();
    // Save the modified PDF to a file
    fs.writeFileSync('./modifiedPdf1.pdf', modifiedPdfBytes);
    uploadPdfToBubble("./modifiedPdf1.pdf");

    try {
      res.send("1st pdf created with answers");
    } catch (error) {
      res.send(error);
    }
  };

  const createNewUpdatedPdfInstance = async (req,res) => {
    let {Cluster} = req.body;
    const pdfBytes = fs.readFileSync('./PDF_Form/FINAL2.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    fields.forEach(field => {
        let name = field.getName();
        let matchingObject = Cluster.find(obj => obj.fieldName === name);
        if(matchingObject != undefined){
            let textField = form.getTextField(matchingObject.fieldName);
            textField.setText(matchingObject.Answer);
        }
    });

    form.flatten();

    const modifiedPdfBytes = await pdfDoc.save();

    // Save the modified PDF to a file
    fs.writeFileSync('./modifiedPdf2.pdf', modifiedPdfBytes);
    try {
      res.send("2nd pdf created with answers");
    } catch (error) {
      res.send(error);
    }
  };

const flattenPDF = async (req,res)=>{
const xfaPdfBytes = fs.readFileSync('./PDF_Form/xfapdf.pdf');
const pdfDoc = await PDFDocument.load(xfaPdfBytes);
const form = pdfDoc.getForm();
form.deleteXFA();
form.flatten();

const flattenedPdfBytes = await pdfDoc.save();
fs.writeFileSync('./outxxput.pdf', flattenedPdfBytes);
}

async function uploadPdfToBubble(pdfFilePath) {
  const pdfFile = fs.readFileSync("./modifiedPdf1.pdf");
  let name = uuidv4() + ".pdf";
  const pdfFileBase64 = pdfFile.toString('base64');
  let webhookUrl = "https://poc-46861.bubbleapps.io/version-test/api/1.1/wf/test";
  try {
      const response = await axios.post(webhookUrl, { file: 
        {
          filename: name,
          contents: pdfFileBase64
        }
         });
      console.log(response.data);
  } catch (err) {
      console.error(err);
  }
}

// Example usage

  // Export functions to index
  module.exports = {
    getFieldInfo,
    createNewPdfInstance,
    createNewUpdatedPdfInstance,
    flattenPDF,
    getFieldInfoDynamic
  }; 
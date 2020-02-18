const {pipeline} = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

const CSV_FILE_PATH = './csv/data.csv';
const TXT_FILE_PATH = './csv/data.txt';

function convertCsvDataToTxtData(csvFlePath, txtFilePath) {
    pipeline(
        fs.createReadStream(csvFlePath),
        csv({
            noheader: false,
            headers: ['book', 'author', 'amount', 'price'],
            colParser: {'price': 'number'},
            ignoreColumns: /amount/
        }),
        fs.createWriteStream(txtFilePath),
        (error) => {
            if (error) {
                console.error('Failed to convert csv file to txt file: ' + error);
            } else {
                console.log('Successfully converted csv file to txt file.');
            }
        }
    );
}

convertCsvDataToTxtData(CSV_FILE_PATH, TXT_FILE_PATH);

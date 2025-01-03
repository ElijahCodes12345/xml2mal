
const xml2js = require('xml2js');
const fs = require('fs');
const xmlModel = require('../models/xmlModel'); // Import the model for data processing

// Handles file upload and XML conversion
exports.uploadXML = async (req, res, next) => {
    try {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const xmlFile = req.files.file;
    const { username } = req.body;
    const inputXML = xmlFile.data.toString();  // Convert file buffer to string

    xmlModel.convertXML(inputXML, (err, animeList) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error processing XML');
        }

        const outputXML = xmlModel.generateMALXML(animeList, username);
        res.render('index', { outputXML, status: 'success' })
    });
    } catch (err) {
        console.error(err);
        next(err);
    }

};

exports.downloadXML = (req, res) => {
    const { outputXML } = req.body;

    res.setHeader('Content-Disposition', 'attachment; filename="animelist.xml"');
    res.setHeader('Content-Type', 'application/xml');

    res.send(outputXML);
}
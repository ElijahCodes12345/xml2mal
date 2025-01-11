const xml2js = require('xml2js');
const fs = require('fs').promises; 
const { Readable } = require('stream');
const xmlModel = require('../models/xmlModel');
const util = require('util');

const FILE_SIZE_LIMIT = 1 * 1024 * 1024; // 1MB limit for in-memory processing

exports.uploadXML = async (req, res, next) => {
    let tempFilePath = null;
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const xmlFile = req.files.file;
        const { username } = req.body;

        if (xmlFile.tempFilePath) {
            tempFilePath = xmlFile.tempFilePath;
            await processWithTempFile(xmlFile, username, res);
        } else {
            await processInMemory(xmlFile, username, res);
        }
    } catch (err) {
        console.error('Error in uploadXML:', err);
        next(err);
    } finally {
        if (tempFilePath) {
            try {
                await fs.unlink(tempFilePath);
                console.log('Temporary file deleted successfully:', tempFilePath);
            } catch (unlinkErr) {
                console.error('Error deleting temporary file:', unlinkErr);
                // Don't throw the error as it's cleanup code
            }
        }
    }
};

async function processWithTempFile(file, username, res) {
    try {
        const data = await fs.readFile(file.tempFilePath, 'utf8');

        if (!data.trim().startsWith('<?xml') && !data.trim().startsWith('<list>')) {
            return res.status(400).json({ 
                error: 'Invalid XML file',
                details: 'File does not contain valid XML data'
            });
        }

        const convertXMLAsync = util.promisify(xmlModel.convertXML);
        const animeList = await convertXMLAsync(data);

        const outputXML = xmlModel.generateMALXML(animeList, username);
        res.render('index', { 
            outputXML, 
            status: 'success',
            animeCount: animeList.length
        });

    } catch (err) {
        console.error('Error in temp file processing:', err);
        throw err;
    }
}

async function processInMemory(file, username, res) {
    try {
        const inputXML = file.data.toString('utf8');
        
        const convertXMLAsync = util.promisify(xmlModel.convertXML);
        const animeList = await convertXMLAsync(inputXML);

        const outputXML = xmlModel.generateMALXML(animeList, username);
        res.render('index', { 
            outputXML, 
            status: 'success',
            animeCount: animeList.length
        });

    } catch (err) {
        console.error('Error in memory processing:', err);
        throw err;
    }
}

exports.downloadXML = (req, res) => {
    try {
        const { outputXML } = req.body;
        if (!outputXML) {
            return res.status(400).json({ error: 'No XML data provided' });
        }

        const readable = Readable.from([outputXML]);

        res.setHeader('Content-Disposition', 'attachment; filename="animelist.xml"');
        res.setHeader('Content-Type', 'application/xml');

        readable.pipe(res);
    } catch (err) {
        console.error('Error in downloadXML:', err);
        res.status(500).json({ 
            error: 'Error downloading XML',
            details: err.message
        });
    }
};
const xml2js = require('xml2js');

// Converts the uploaded XML into a list of anime objects
exports.convertXML = (inputXML, callback) => {
    const parser = new xml2js.Parser();

    parser.parseString(inputXML, (err, result) => {
        if (err) return callback(err);  // Error handling

        const animeList = [];
        result.list.folder.forEach(folder => {
            const status = folder.name[0];  // 'Completed', 'Watching', etc.
            folder.data[0].item.forEach(item => {
                const anime = {
                    title: item.name[0],
                    link: item.link[0],
                    status: mapStatusToMAL(status) // Map to MAL status codes
                };
                console.log(anime);
                animeList.push(anime);
            });
        });

        callback(null, animeList);
    });
};

// Helper function to map the folder names to MAL status codes
function mapStatusToMAL(status) {
    switch (status) {
        case 'Completed': return 2;
        case 'Watching': return 1;
        case 'On-Hold': return 3;
        case 'Plan to watch': return 6;
        default: return 6;  // Default to "Plan to Watch"
    }
}

// Escapes special characters for XML
function escapeXML(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Generates MAL-compatible XML structure from the anime list
exports.generateMALXML = (animeList, username) => {
    let outputXML = `<?xml version="1.0" encoding="UTF-8" ?>\n<myanimelist>\n`;
    outputXML += `
    <myinfo>
        <user_name>${username}</user_name>
        <user_export_type>1</user_export_type>
        <user_total_anime>0</user_total_anime>
        <user_total_watching>0</user_total_watching>
        <user_total_completed>0</user_total_completed>
        <user_total_onhold>0</user_total_onhold>
        <user_total_dropped>0</user_total_dropped>
        <user_total_plantowatch>0</user_total_plantowatch>
    </myinfo>`   

    animeList.forEach(anime => {
        const animeID = extractAnimeID(anime.link);  // Extract ID from URL
        console.log(animeID);
        const escapedTitle = escapeXML(anime.title); // Escape special characters in the title
        const animeStatus = anime.status;
        
        outputXML += `
        <anime>
            <series_animedb_id>${animeID}</series_animedb_id>
            <series_title>${escapedTitle}</series_title>
            <my_status>${animeStatus}</my_status>
            <my_score>0</my_score>
            <my_last_updated>${Math.floor(Date.now() / 1000)}</my_last_updated>
            <update_on_import>1</update_on_import>
        </anime>`;
    });

    outputXML += `\n</myanimelist>`;
    return outputXML;
};

// Extracts the anime ID from the MyAnimeList URL
function extractAnimeID(link) {
    return link.split('/')[4];  // Get the ID part from the URL
}

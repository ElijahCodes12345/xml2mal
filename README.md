# XML2MAL

## Overview
This project is a cool web application that allows users to upload their XML anime list and convert it to a format compatible with MyAnimeList. The application processes the uploaded XML file and generates the required XML output for importing back into MyAnimeList.

## Features
- Upload XML file containing an anime list.
- Input for MyAnimeList username.
- Conversion of the XML file to MyAnimeList format.
- Download the converted XML file.

## Technologies Used
- Node.js
- Express.js
- express-fileupload (for handling file uploads)
- EJS (Embedded JavaScript Templates)
- xml2js (for XML parsing)

## Getting Started
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
4. Open the application in a web browser at `http://localhost:3000`.

## Future Development
- Add support for more anime list formats (.json, .txt, etc.)

## Contributing
Contributions are welcome! If you have suggestions for improvements, features or bug fixes, feel free to create an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

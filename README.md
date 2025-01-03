```markdown
# XML2MAL

## Overview
XML2MAL is a web-based tool that helps users convert their anime lists from various platforms into MyAnimeList's compatible XML format. This tool streamlines the process of transferring your anime tracking data between different anime platforms.

## Live Application
Visit the application at: [https://xml2mal.vercel.app/](https://xml2mal.vercel.app/)

## How to Use

### Step 1: Export Your Anime List
1. Go to your current anime tracking platform (e.g., hianime.to)
2. Navigate to your profile or list settings
3. Look for an export option
4. Export your list in XML format grouped by folder

### Step 2: Convert Your List
1. Visit [XML2MAL](https://xml2mal.vercel.app/)
2. Upload your exported XML file
3. Enter your MyAnimeList username
4. Click Convert to generate your MAL-compatible XML

### Step 3: Import to MyAnimeList
1. Go to [MyAnimeList Import Page](https://myanimelist.net/import.php)
2. Import the converted XML file
3. Follow MAL's import instructions to complete the process

## Features
- Simple and intuitive user interface
- Fast XML conversion
- Support for folder-based list structure
- Instant preview of converted XML
- One-click download of converted file
- Cross-platform compatibility

## Technical Details

### Expected Input XML Structure
```xml
<list>
    <folder>
        <name>Completed</name>
        <data>
            <item>
                <!-- Item details go here -->
            </item>
        </data>
    </folder>
</list>
```

### Technologies Used
- Node.js
- Express.js
- express-fileupload
- EJS (Embedded JavaScript Templates)
- xml2js

## Development

### Local Setup
1. Clone the repository:
```bash
git clone https://github.com/ElijahCodes12345/xml2mal.git
cd xml2mal
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Open `http://localhost:3000` in your browser

## Roadmap
- Support for additional anime list formats (.json, .txt)
- Batch conversion support
- Enhanced error handling and validation
- Support for more anime tracking platforms

## Contributing
Found a bug? Have a feature request? Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Support
If you encounter any issues or have questions:
1. Check existing [GitHub Issues](https://github.com/ElijahCodes12345/xml2mal/issues)
2. Create a new issue if needed

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```


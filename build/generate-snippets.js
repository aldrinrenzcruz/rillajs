const fs = require('fs');
const path = require('path');

/**
 * Script to generate @snippets.json from .txt files in docs/code-snippets directory
 */

function generateSnippetsJson() {
  const snippetsDir = path.join(process.cwd(), 'docs', 'code-snippets');
  const outputFile = path.join(snippetsDir, '@snippets.json');

  try {
    // Check if directory exists
    if (!fs.existsSync(snippetsDir)) {
      console.error(`❌ Directory not found: ${snippetsDir}`);
      process.exit(1);
    }

    // Read all files in the directory
    const files = fs.readdirSync(snippetsDir);

    // Filter for .txt files and remove extension
    const txtFiles = files
      .filter(file => path.extname(file) === '.txt')
      .map(file => path.basename(file, '.txt'))
      .sort(); // Sort alphabetically

    if (txtFiles.length === 0) {
      console.warn('⚠️  No .txt files found in the directory');
    }

    // Create the JSON structure
    const snippetsData = {
      examples: txtFiles
    };

    // Write to @snippets.json
    fs.writeFileSync(outputFile, JSON.stringify(snippetsData, null, 2), 'utf8');

    console.log('✅ Successfully generated @snippets.json');
    console.log(`📁 Location: ${outputFile}`);
    console.log(`📊 Found ${txtFiles.length} .txt files:`);
  } catch (error) {
    console.error('❌ Error generating snippets:', error.message);
    process.exit(1);
  }
}

generateSnippetsJson();
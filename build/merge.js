const fs = require("fs-extra");
const path = require("path");

// Define paths 
const sourceDir = path.resolve(__dirname, "../src/js"); // Adjusted for relative path from /build 
const outputDir = path.resolve(__dirname, "../dist");
const outputFile = path.join(outputDir, "rilla.js");

// List of JavaScript files to merge (in order) 
const files = [
  "Selector.js",
  "ElementContent.js",
  "ClassUtils.js",
  "EventListeners.js",
  "Storage.js",
  "Visibility.js",
  "Draggable.js",
  "InjectedStyles.js"
];

// Ensure output directory exists 
fs.ensureDirSync(outputDir);

console.log("Merging JavaScript files...");

// Read, merge, and write files 
const mergedContent = files
  .map(file => {
    const filePath = path.join(sourceDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`✔ Adding: ${file}`);
      return fs.readFileSync(filePath, "utf-8");
    } else {
      console.warn(`⚠ File not found: ${file}`);
      return "";
    }
  })
  .filter(content => content.trim() !== "") // Remove empty files 
  .join("\n\n"); // Add space between merged files 

fs.writeFileSync(outputFile, mergedContent, "utf-8");

console.log(`✅ Successfully merged ${files.length} files into: ${outputFile}`);
const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.resolve(__dirname, "../src/rilla");
const outputDir = path.resolve(__dirname, "../dist");
const outputFile = path.join(outputDir, "rilla.js");

const files = [
  "DOMSelectors.js",
  "DOMManipulation.js",
  "Attributes.js",
  "ClassUtils.js",
  "EventHandling.js",
  "Storage.js",
  "Visibility.js",
  "Draggable.js",
  "InjectedStyles.js"
];

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
  .filter(content => content.trim() !== "")
  .join("\n\n");

fs.writeFileSync(outputFile, mergedContent, "utf-8");

console.log(`✅ Successfully merged ${files.length} files into: ${outputFile}`);
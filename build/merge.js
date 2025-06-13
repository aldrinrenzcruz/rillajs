const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.resolve(__dirname, "../src");
const outputDir = path.resolve(__dirname, "../dist");
const outputFile = path.join(outputDir, "rilla.js");

const directories = [
  "DOM Selection",
  "DOM Traversal",
  "DOM Manipulation",
  "Event Handling",
  "Attribute Utilities",
  "String Manipulation",
  "Element Interaction",
  "Element Visibility",
  "Storage Utilities",
  "URL Utilities",
];

fs.ensureDirSync(outputDir);

console.log("Merging JavaScript files...");

function getFilesFromDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠ Directory not found: ${dirPath}`);
    return [];
  }

  const files = fs.readdirSync(dirPath);
  return files
    .filter(file => file.endsWith('.js'))
    .map(file => path.relative(sourceDir, path.join(dirPath, file)));
}

let files = [];

directories.forEach(dir => {
  const dirPath = path.join(sourceDir, dir);
  const dirFiles = getFilesFromDirectory(dirPath);

  console.log(`Found ${dirFiles.length} files in ${dir}/`);
  files = files.concat(dirFiles);
});

console.log(`Total files to merge: ${files.length}`);

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
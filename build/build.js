import fs from "fs-extra";
import { replaceInFile } from "replace-in-file"; // Named import

async function build() {
  // Copy index.html to public/
  fs.copySync("index.html", "public/index.html");

  try {
    await replaceInFile({
      files: "public/index.html",
      from: [
        /script\.js/g, 
        /style\.css/g,
        /dist\/rilla\.js/g,   // Replace ./dist/rilla.js
        /public\/js\/app\.js/g // Replace ./public/js/app.js
      ],
      to: [
        "./script.min.js",        // Added a period before the path
        "./style.min.css",        // Added a period before the path
        "./dist/rilla.min.js",    // Added a period before the path
        "./public/js/app.min.js"  // Added a period before the path
      ],
    });

    console.log("✅ index.html copied and updated in /public");
  } catch (error) {
    console.error("❌ Error updating index.html:", error);
  }
}

// Run the build process
build();

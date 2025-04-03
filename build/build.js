import fs from "fs-extra";
import { replaceInFile } from "replace-in-file";

async function build() {
  fs.copySync("index-dev.html", "index.html");

  try {
    await replaceInFile({
      files: "index.html",
      from: [
        /<script\s+src="\.\/public\/js\/highlight\.min\.js"><\/script>/g,
        /<script\s+src="\.\/dist\/rilla\.js"><\/script>/g,
        /<script\s+src="\.\/public\/js\/app\.js"><\/script>/g
      ],
      to: [
        '<script src="./public/js/highlight.min.js"></script>',
        '<script src="./dist/rilla.min.js"></script>',
        '<script src="./public/js/app.min.js"></script>'
      ],
    });

    console.log("✅ index-dev.html copied and updated");
  } catch (error) {
    console.error("❌ Error updating index-dev.html:", error);
  }
}

build();

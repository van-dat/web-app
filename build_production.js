import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { rimraf } from "rimraf";
const sourceFolder = "./dist/assets/"; // Replace with the path to your source folder
const destinationFilePath = "./build/wordfinder.js";
const destinationCssFilePath = "./build/wordfinder.css";

rimraf.sync(sourceFolder);
// rimraf.sync(".parcel-cache");

exec("tsc && vite build", () => {
  if (!fs.existsSync("./build/")) {
    fs.mkdirSync("./build/", { recursive: true });
  }

  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error(`Error reading source folder: ${err.message}`);
    } else {
      // Find the first JavaScript file in the folder
      const jsFile = files.find((file) => file.endsWith(".js"));
      const cssFile = files.find((file) => file.endsWith(".css"));

      if (jsFile) {
        const sourceFilePath = path.join(sourceFolder, jsFile);

        // Read the content from the source JavaScript file
        fs.readFile(sourceFilePath, (err, data) => {
          if (err) {
            console.error(`Error reading source file: ${err.message}`);
          } else {
            // Write the content to the destination file
            fs.writeFile(destinationFilePath, data, (err) => {
              if (err) {
                console.error(
                  `Error writing to destination file: ${err.message}`
                );
              } else {
                console.log(
                  `File copied from ${sourceFilePath} to ${destinationFilePath}`
                );
              }
            });
          }
        });
      } else {
        console.error("No JavaScript files found in the source folder.");
      }

      if (cssFile) {
        const sourceFilePath = path.join(sourceFolder, cssFile);

        // Read the content from the source JavaScript file
        fs.readFile(sourceFilePath, (err, data) => {
          if (err) {
            console.error(`Error reading source file: ${err.message}`);
          } else {
            // Write the content to the destination file
            fs.writeFile(destinationCssFilePath, data, (err) => {
              if (err) {
                console.error(
                  `Error writing to destination file: ${err.message}`
                );
              } else {
                console.log(
                  `File copied from ${sourceFilePath} to ${destinationCssFilePath}`
                );
              }
            });
          }
        });
      } else {
        console.error("No CSS files found in the source folder.");
      }
    }
  });
});

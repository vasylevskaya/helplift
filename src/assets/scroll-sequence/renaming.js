const fs = require('fs');
const path = require('path');

// Path to the folder containing the images
const folderPath = './images'; // Modify this to your folder
const extName = '.webp'

// Read the files in the directory
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  let filesToRename = files

  // Filter by extention, if needed
  if (extName) {
    filesToRename = files.filter(file => path.extname(file) === extName);
  }

  if (filesToRename.length) {
    console.log('No files to rename');
  }

  filesToRename.forEach((file, index) => {
    console.log(file)
    // Create new name with zero-padded index (e.g., image001, image002)
    const newName = `image${String(index + 1).padStart(3, '0')}${extName}`;

    // Get the full paths
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, newName);

    // Rename the file
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming ${file} to ${newName}:`, err);
      } else {
        console.log(`${file} renamed to ${newName}`);
      }
    });
  });
});

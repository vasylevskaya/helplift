Documentation

Packages:
- Recoil (state management)
- FontAwesome (icons)

Assets:
- /images (general images and icons);
- /products (separate folder for each product)
- /scroll-sequence:
/images-low (images for animation)
renaming.js (run to automatically rename all images)
ScrollSequenceImagesImport.js - imports all images for animation
- product.json - products info
- routes.json - routes info
- text-content.json - for bigger texts; can be used for localisation in future
- contact-form - JSON for rendering contact form

Animated Section (scroll sequence):
1. Changing images:
- Images are stored in assets/scroll-sequence/images.
- You can run renaming.js file to format images' names automatically.
- Adjust length in ScrollSequenceImagesImport (should be equal to images quantity).
- Adjust start points of the stages in ScrolSequence.jsx (frameIndexesRange)


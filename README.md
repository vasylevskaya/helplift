1. Helplift | [https://helplift.com.ua]
Framework: React.js
Libraries:
- emailjs/browser: Handles contact form messages
- fortawesome/fontawesome-free: Provides icons
- formik: Manages the contact form
- recoil: Manages state
- yup: Validates forms

2. Getting Started
After cloning the repository, run the following commands:
npm install
npm start

3. Project Structure
/src  
  /assets  
    /images                # General images and icons  
    /products              # Separate folder for each product  
    /scroll-sequence       # Video sequences for the animated section  
  /product.json            # Product information  
  /routes.json             # Routes information  
  /text-content.json       # Texts for localization (future use)  
  /contact-form            # JSON for rendering the contact form  
  /components              # Reusable UI components  
  /helpers
    animationText.js       # helper functions to manage animation
  /hooks
    AutoPlaySilentVideo.jsx # Preload the video
  /pages                   # Page-specific components  
  /recoil  
    atoms.js               # Atoms for state management  
  /styles                  # Stylesheets  
  App.jsx                  # Main app file  
  index.js                 # Root file  

4. Deployment
The website is deployed on GitHub Pages. To deploy:
npm run deploy

5. Feature: ScrollSequenceVideo.jsx
Animated section with a video that plays forward and reverse based on scroll direction.

Steps to update the video:
- Replace videoForward and videoReverse (mob and desktop) files with the new video files.
- Adjust stopPointsForward and stopPointsReverse to align with the phases of the animation.
- Test thoroughly to ensure the animation works as expected.
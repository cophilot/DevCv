<div align="center">
  <br />
  <img src="src/assets/logo.png" alt="DevCvLogo" width="40%"/>
  <h1>DevCv</h1>
  <p>
     Description
  </p>
</div>

<!-- Badges -->
<div align="center">
   <a href="https://github.com/phil1436/DevCv/releases">
       <img src="https://img.shields.io/github/v/release/phil1436/DevCv?display_name=tag" alt="current realease" />
   </a>
   <a href="https://github.com/phil1436/DevCv/blob/master/LICENSE">
       <img src="https://img.shields.io/github/license/phil1436/DevCv" alt="license" />
   </a>
   <a href="https://github.com/phil1436/DevCv/stargazers">
       <img src="https://img.shields.io/github/stars/phil1436/DevCv" alt="stars" />
   </a>
   <a href="https://github.com/phil1436/DevCv/commits/master">
       <img src="https://img.shields.io/github/last-commit/phil1436/DevCv" alt="last commit" />
   </a>
</div>

---

- [Installation](#installation)
- [Add your own data](#add-your-own-data)
  - [Contact](#contact)
  - [Skills](#skills)
- [Export](#export)

---

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Navigate to `http://localhost:4200/`

---

## Add your own data

You can edit the data in the [src/assets/content](src/assets/content) folder.

Follow the structure of the JSON files and add your own data.

Each file has a JSON object with either a `all` or `de` and `en` property. Choose the `all` property if you want to use the same data for both languages. Otherwise use the `de` and `en` properties to add different data for each language.

### Contact

- Add an icon from [Bootstrap Icon](https://icons.getbootstrap.com/) for each contact entry.
- Leave the link empty then no link will be added to the icon.

### Skills

To add an image to the skills section add the image to the [src/assets/icons/logos](src/assets/icons/logos) folder and name it like a skill in lowercase followed by `.png` (e.g. `angular.png` for the skill _Angular_).

---

## Export

> Export via **Microsoft Edge** for the best quality!

1. Click on the print button
2. Select the desired printer to _"Save as PDF"_
3. Choose the pages you want to export (e.g. 1-2)
4. Click on _"More settings"_
5. Set the paper size to _"A4"_
6. Set the margins to _"Default"_
7. Set the scale to _"140%"_ or play around with the scale to get the best result
8. Uncheck _"Headers and footers"_
9. Check _"Background graphics"_
10. Click on _"Print"_

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

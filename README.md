# Musicflake

Listen to music based on weather conditions of your area!
## Screenshot

![App Screenshot](https://yussufbiyik.github.io/assets/musicflake.webp)

[Click to visit the page](https://musicflake-3f0a8.web.app/)
## Features

- Weather based playlist recommendation
- Basic, readable UI


## Known Issues
1. Does not recommend any playlist when the user asks for a recommendation for the first time
### Possible Reasons of Issues

#### First Issue
```weather.service.ts:52``` does not return any value for the first time so the function returns "error is logged" message when there are no appearent errors that are catched by the catch block (line 65).
## Roadmap

### TODO:
- Fix known issues
- Clean and comment the code
- Delete unused code or fix unreleased broken features that are causing these code lines

### Maybe Someday
- AI assisted music recommendation from the user's own liked songs
## Contributing
There are a few of contributing to this project

### First Way
1. Fork this project
2. Follow the installation instructions
3. Create a branch
4. Make your changes
5. Make a pull request
- Make sure to explain your changes and comment the code as needed.
### Second Way
1. Go the [project website](https://musicflake-3f0a8.web.app/)
2. Click on the button that says "📩 Send your playlists!"
3. Fill the form then submit!
## Installation
Install musicflake with git
```bash
  git clone https://github.com/yussufbiyik/musicflake.git
  cd musicflake
```
Configure the environment variables to run the project properly
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file which should be located in a folder named as "environments", this folder includes two files: "environment.prod.ts" and "environment.ts"

Both of the files export the same variable which is:

```javascript
export const environment = {
    production: true, // Change to false if the file name is environment.ts
    firebaseConfig:{
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    }
};
```

To run the project locally, all you need to change is firebase config which is something you can get by enabling firebase hosting.
## Appendix

- [Weather data by Open-Meteo.com](https://open-meteo.com/)
- [Glass effects by css.glass](https://css.glass/)
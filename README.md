# Location Autosuggest Input

[Demo Link](https://location-autosuggest.vercel.app/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

- The suggestion list in autocomplete support key navigation
- Use Debounce function for input performance
- Show spinner loader when making request

## Project structure

In this project, I tried to introduce a simple, but still scalable project structure. Some solution here can be overkill for such a small application, but idea was to introduce an architecture which can easily handle mediums size applications and more.

```
ride-input/src
└─── components // dumb component, which can be shared across application
│   └─── AutoSuggestInput
│       └─── style.css
│       └─── index.css
└─── modules  // modules or features
│   └─── Search // Search Form
│       └─── components
│       └─── API
│
└───App.js
```

## Trade-Offs

Because it's still a test assignment, I skipped some parts, which can sometimes be expected more in real projects. If you think something here is important now, please contact me, and I can change or improve it.

- I write only integration tests. Unit tests and maybe e2e tests can be expected in the real project.
- Almost didn't use any comments in the code
- Don't have any PropTypes or TypeScript
- Using just plain CSS (BEM for naming convention and isolation). In a real project, it's better to use some pre or post-processor, which will add some nice feature like variables or nesting.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

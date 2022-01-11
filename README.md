# JustStreamIt

JustStreamIt is a movie catalog that shows a sample of the best rated movies ever. 

This repository contains the implementation code of my web view for JustStreamIt, all the data comes from the API provided by [this repository](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR).

I made a fantastic ligth-theme netflix design (yikes) for the occasion.

## Bundler

I used [vite.js](https://vitejs.dev/) as a build tool because it leverages native [EcmaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) which allows a better project structure and makes [HMR](https://vitejs.dev/guide/features.html#hot-module-replacement) faster.

## Run the project

### Requirements

You should have [Node.js](https://nodejs.org) setup on your machine.

Then you can install the project dependencies.

```
npm install
```

### Usage

Starting the development server is as simple as follows.

```
npm run dev
```

You might want to try the production build, this will compile the SASS files to a CSS file with vendor prefixes, and bundle our javascript code with eventual polyfills.

```
npm run build
```

The production website can be previewed with `npm run preview`.

# Learnful Studio Theme

This theme is part of the [OER Studio](https://github.com/learnfullabs/oerstudio-project) project - a free and open-source platform for creating open education resources.
This is a subtheme built on top of the [Radix](https://www.drupal.org/project/radix) theme for Drupal 8/9.

## Installation

Learnful Studio theme uses [Webpack](https://webpack.js.org) to compile and bundle SASS and JS.

#### Step 1
Make sure you have Node and npm installed.
You can read a guide on how to install node here: https://docs.npmjs.com/getting-started/installing-node

If you prefer to use [Yarn](https://yarnpkg.com) instead of npm, install Yarn by following the guide [here](https://yarnpkg.com/docs/install).

#### Step 2
Go to the root of Learnful Studio theme and run the following commands: `npm install` or `yarn install`.

#### Step 3
Update `proxy` in **webpack.mix.json**.

#### Step 4
Run the following command to compile Sass and watch for changes: `npm run watch` or `yarn watch`.

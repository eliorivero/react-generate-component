# React Generate Component

A tool to generate a React component

## Overview

This tool was inpired by Ember's CLI tool to generate component. It will generate:

- a React functional component
- its SASS stylesheet
- and a simple test using Jest and Enzyme

Right now it will only write to `app/components` relative to the current directory. Will be adding more customization and component templates (like those using hooks, or Redux) soon.

## Install Deno

You need Deno to run this. You can install it on macOS with:

```
brew install deno
```

Other methods and systems are described in the [Deno Manual](https://deno.land/manual/getting_started/installation).

## Use this tool

Once you have Deno, you can run this directly from GitHub:

```
deno run --allow-read --allow-write https://raw.githubusercontent.com/eliorivero/react-generate-component/master/mod.ts nav-bar
```

You need both flags because it has to read the directory where it will write the file. If the directory doesn't exist, it will create it.
This will generate:

```
./app/components/NavBar/index.js
./app/components/NavBar/style.scss
./app/components/NavBar/test.js
```

Without the hyphen:

```
deno run --allow-read --allow-write https://raw.githubusercontent.com/eliorivero/react-generate-component/master/mod.ts button
```

it will generate:

```
./app/components/Button/index.js
./app/components/Button/style.scss
./app/components/Button/test.js
```

## Install this tool

Deno allows you to install this tool so it works offline:

```
deno install --allow-read --allow-write --name reactgc https://raw.githubusercontent.com/eliorivero/react-generate-component/master/mod.ts
```

The tool will be named `reactgc`.
When the process finish, if you haven't added the `./deno/bin` path to your PATH environment variable, Deno will prompt you to do so.

Once you add it, you can now invoke the tool:

```
reactgc nav-bar
```

------

Created by [StartFunction](https://startfunction.com).
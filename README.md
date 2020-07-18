# React Generate Component

A tool to generate a React component

![Generate React component](https://i2.wp.com/startfunction.com/wp-content/uploads/2020/07/reactgc.gif "Generate React component")

## Overview

This tool was inpired by Ember's CLI tool that generates a component. It will generate the following files in a single directory:

- `index.js`, a React functional component
- `style.scss`, its SASS stylesheet
- `test.js`, a simple test using Jest and Enzyme

By default, it will write to `app/components` relative to the current directory, and it's possible to customize the path. Will be adding more customization and component templates (like those using hooks, or Redux) soon.

For an overview of how this Deno CLI tool was created, visit https://startfunction.com/how-to-create-deno-cli-tool

## Install Deno

You need the Deno runtime to use this tool. You can install it on macOS with:

```
brew install deno
```

Other methods and systems are described in the [Deno Manual](https://deno.land/manual/getting_started/installation).

## Use this tool

Once you have Deno, you can run this directly from GitHub:

```
deno run --allow-read --allow-write https://raw.githubusercontent.com/eliorivero/react-generate-component/master/mod.ts nav-bar
```

You need both `--allow-read` and `--allow-write` flags because it has to read the directory where it will write the file. If the directory doesn't exist, it will create it. This will generate:

```
app/components/NavBar/index.js
app/components/NavBar/style.scss
app/components/NavBar/test.js
```

Without the hyphen:

```
deno run --allow-read --allow-write https://raw.githubusercontent.com/eliorivero/react-generate-component/master/mod.ts button
```

it will generate:

```
app/components/Button/index.js
app/components/Button/style.scss
app/components/Button/test.js
```

To specify a custom directory, you can use the `-p` option and run:

```
deno run --allow-read --allow-write https://raw.githubusercontent.com/eliorivero/react-generate-component/master/mod.ts button -p src/components
```

### Generating utility functions

You can also generate simple functions passing the `-u` parameter:

```
deno run --allow-write --allow-read mod.ts is-data-loaded -u
```

and it will generate:

```
app/utils/isDataLoaded.js
```

### Using the provided name as directory

If you want to pass something like `top-nav` as the component name so it's composed as `TopNav` but you still want to use `top-nav` as the component directory, you can provide the `-e` option and for an input like:

```
deno run --allow-write --allow-read mod.ts top-nav -e
```

and it will generate:

```
app/components/top-nav/index.js
app/components/top-nav/style.scss
app/components/top-nav/test.js
```

In the case of utility functions, the exact input will be used for the file name. This:

```
deno run --allow-write --allow-read mod.ts is-data-loaded -u -e
```

will generate:

```
app/utils/is-data-loaded.js
```


## Install this tool

Deno also allows you to install this tool so it works offline:

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

# rc-codegen

React code generation for your projects. This package contains **opinionated** generators. For a sole
developer this might not be useful however for teams this approach might be useful to keep a consistent coding style among developers (and react projects)

This tool uses [http://www.hygen.io/](http://www.hygen.io/) in the background but exposes only a curated set of generators for the consumers of this package. What does this actually mean?

If you read the `hygen` documentation it tells you that you should

1. init hygen in your project
2. then commit the \_templates to the repository

This works well for one project, but what if your workplace/team runs multiple react projects in parallell however there is a need for a consistent code style.

If you like the generated react code what this lib provides then use it, otherwise you can incorporate the idea behing this and create your own shared react code generator.

# Motivation

I noticed in my team that the developers after setting up some ground rules with regards to coding conventions doesn't care how we write something until we are consistent. For example, in a react `Provider` we make the provider context available to the rest of the codebase via a hook. It doesn't matter for the developers if we export such hook from the `Provider.tsx` file or we create a separate file just for the hook until we all do thee same.

Usually, these kind of conventions are covered by a documentation or coding guidelines. This package takes this to the next level by providing code generation tools where the generated code follows those guidelines.

# Example

In a react project

```shell
npm i rc-codegen
```

This exposes a `rcgen` binary. To use it either run `npm exec rcgen`

```shell
~/Development/repos/rc-codegen-test (main ✗) npm exec rcgen
✔ What do you want to generate? · provider
✔ What kind of provider do you want to generate? · with-context
✔ What's your provider's name? · ThemeProvider
✔ What javascript flavor do you want use? · .tsx
✔ What kind of state container? · useReducer
✔ Outfile: src/providers/ThemeProvider.tsx (y/N) · true

Loaded templates: node_modules/rc-codegen/_templates
✔      exists: src/providers/ThemeProvider.tsx. Overwrite? (y/N):  (y/N) · true
       added: src/providers/ThemeProvider.tsx
```

Or call from `node_modules` as `node_modules/.bin/rcgen`

```shell
~/Development/repos/rc-codegen-test (main ✗) node_modules/.bin/rcgen 
? What do you want to generate? … 
hook
provider
```

Or create an npm script for it in package.json.

# To add a new generator

You should read [http://www.hygen.io/](http://www.hygen.io/) first to have a good idea about generating code with `hygen`

```shell
npx hygen generator new <GENERATOR_NAME>
```

Example:

```shell
npx hygen generator new provider
```

this will generate

```
_templates
└── provider
    └── new
        └── hello.ejs.t
```

Here, `provider` is thee command and `new` is the subcommand. Let's rename `new` to `with-context`. Next, we also want to provide a nice prompt, so add a new file `index.js` next to `hello.ejs.t`. We should also rename `hello.ejs.t` to `provider.ejs.t`. After all this, we end up with

```
_templates
└── provider
    └── with-context
        ├── index.js
        └── provider.ejs.t
```

The `index.js` file covers the `prompt` and `.ejs.t` file is the template

# Writing EJS templates

The playground helps tremendously [https://ionicabizau.github.io/ejs-playground/](https://ionicabizau.github.io/ejs-playground/)

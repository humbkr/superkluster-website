# Superkluster.com
> Superkluster band website.

## Development

### Quick start

```bash
# Install dependencies
yarn install

# Setup environment variables
cp .env .env.local
vi .env.local

# Run the dev server.
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available yarn scripts
- `yarn dev`: starts the development server
- `yarn build`: builds the project for production
- `yarn start`: starts the production server
- `yarn test`: runs tests
- `yarn eslint`: shows eslint warnings and errors for all source files
- `yarn lint-check`: shows output of prettier-eslint for all source files
- `yarn lint`: runs prettier-eslint on all source files and update them

### Code style
This project uses [prettier](https://github.com/prettier/prettier) and [eslint](https://github.com/eslint/eslint) to format the code.
The two linters are linked by [prettier-eslint](https://github.com/prettier/prettier-eslint).

All code pushed to the repository must respect the coding standards enforced by prettier and eslint.

A pre-commit hook will auto-run prettier-eslint at each commit and format the code automatically
then include the resulting code in the commit.
This hook is not magic nor meant to replace good coding practices, so code wisely :)

## Structuring React code
All application code must follow Nextjs recommendations.
Try to organize components by functionality and / or pages.
Common code should be either in "common" directory (components and assets) or in they own directory
at the root of src/ for important stuff such as api abstraction.

Use functional components and hooks whenever possible. Do not use the class syntax.

Styles components should be in the same file as the main component they are used in. Avoid creating 
separate styling files as it adds to the cognitive charge of having several files to be aware of 
during development for the same component and several files with the exact same name in the IDE.  
If a styling component is to be reused in multiple places, do create a separate file.

For the same reason, always prefer naming your files with the name of the component and avoid naming
everything index.js. Use an index.js file only if you want to hide some implementation or bundle
several files as one logical component (like for ducks).

## Recommendations
### Redux
if you need Redux, use [redux-toolkit](https://redux-toolkit.js.org/)

## Troubleshooting
This section should cover every cryptic error and weird behaviour of the app that one can encounter
during development, so that the next person don't waste half a day like you just did :)

##### \<Cryptic error message when doing action x\>
> \<Explanation on how to fix the error\>

##### \<Weird stuff happening when using component y\>
> <Explanation on why it's doing that because the mock api or whatever>

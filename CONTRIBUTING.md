# Contributing

Thank you for taking the time to contribute to elastic-builder! Your work is truly
appreciated.

Please follow this guide to make that PR the best that it can be!

## Guidelines

* Write small commits with concise, descriptive messages.
* Include tests for any new feature, and regression tests for any bug fix.
* Write [es2015+ javascript][1].
* Try to keep the code style consistent. Follow existing patterns.
* Modify or add to the README if your feature needs instructions on how to use it.

## Development

Fork, then clone the repo:
```
git clone https://github.com/your-username/elastic-builder.git
```

Install dependencies using Yarn 1.x (install [node.js][2] and [Yarn][3] first if necessary).
```
yarn install
```

### Write code

Typically, your changes will go in the `src` directory (the `lib` directory
contains transpiled babel code) and the `test` directory.

No need to generate the built files, these will be added when a new version of
elastic-builder is published to npm.

### Run tests

This project uses eslint for javascript linting and ava for testing. Run
linting using `yarn lint` and run tests using `yarn test`. Or run both using:
```
yarn run check
```
This should take care of formatting as well thanks to [eslint-plugin-prettier][4].

### (Optional) Add yourself as a contributor

Thanks for contributing! Go ahead and add yourself to the list of contributors
in the npm package manifest `package.json`.

### Submit your PR

This is the last step! Make sure your PR is aimed to merge with the `master`
branch.

You should also write a good PR message with information on why this feature or
fix is necesary or a good idea. For features, be sure to include information on
how to use the feature; and for bugs, information on how to reproduce the bug is
helpful!

## Need help?

If you have any questions about the feature or fix you want to make, or if you
have doubts about the approach, or anything else you're not sure about, the best
way to get in touch is to [open an issue][5]. I am happy to help out.

[1]: https://babeljs.io/docs/learn-es2015/
[2]: https://nodejs.org/
[3]: https://classic.yarnpkg.com/lang/en/docs/install/
[4]: https://github.com/not-an-aardvark/eslint-plugin-prettier
[5]: https://github.com/sudo-suhas/elastic-builder/issues/new

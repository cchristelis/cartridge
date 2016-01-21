# Contributing [![Stories in Ready][waffle-image]][waffle-url]

- [Discussing Issues](#discussing-issues)
- [Forking and branching](#forking-and-branching)
- [Commit messages](#commit-messages)
- [Issues](#issues-)

## Discussing Issues
If you have a suggestion or a bug fix, please [create an issue](https://github.com/code-computerlove/slate/issues/new) so we can discuss it.

## Forking and branching
Fork the project then create a new branch to work on using [git flow](http://nvie.com/posts/a-successful-git-branching-model).

### Git flow
Use this for feature branching, with a short feature description or the [GitHub issue number](https://github.com/code-computerlove/slate/issues) as a branch name eg:
```sh
git flow feature start 39
```

```sh
git flow feature start header
```

Push to your fork
```sh
git push --set-upstream origin feature/MY-FEATURE
```

Then submit a [Pull Request](https://github.com/code-computerlove/slate/compare) for review and merging by a project owner.

## Commit messages
Try and adhere as closely as possible to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.

## Issues [![Stories in Ready][waffle-image]][waffle-url]
Check out the issues in _Ready_ on the [Waffle board](https://waffle.io/code-computerlove/slate) and work away!

[waffle-url]: https://waffle.io/code-computerlove/slate
[waffle-image]: https://badge.waffle.io/code-computerlove/slate.svg?label=ready&title=Ready

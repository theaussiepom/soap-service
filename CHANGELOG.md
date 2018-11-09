# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.0"></a>
## [2.1.0](https://bitbucket.org/minfos/ref-boilerplate-core/compare/v2.0.0...v2.1.0) (2018-11-09)

### Features

* Remove no-unsafe-any due to development overhead
* Add jUnit-compatible reporting to tests so that CI can report test failures

<a name="2.0.0"></a>
## [2.0.0](https://bitbucket.org/minfos/ref-boilerplate-core/compare/v1.1.1...v2.0.0) (2018-10-29)

### Breaking changes

* Upgraded to NodeJS 8.10.0, NPM 5, TypeScript 3.1, and other version updates to dependent libraries/tools

### Features

* Update to NodeJS v8.10.0
* Update CI to Node v8
* Update to TypeScript v3.1
* Update to Typescript Formatter 7 and enable Auto-Fix-On-Save for formatting and tslint
* Update to Cucumber v4
* Update to Istanbul/nyc v13
* Update to Mocha v5
* Update to Sinon v7
* Update to Chai v4
* Simplify the package preparation and include the source code so that it can be stepped into by consuming packages
* Run the build/test/etc scripts sequentially because parallel is confusing !
* Switch to a better Cucumber extension 'Cucumber (Gherkin) Full Support' (alexkrechik.cucumberautocomplete)
* Disable timeouts in unit tests (mocha) when debugging
* Add no unused locals rule and set VSCode to show style errors as warnings
* Enable TSLint rule: no-unsafe-any

### Bug Fixes

* Fix the merge-check pipeline when running it on a branch


<a name="1.1.1"></a>
## [1.1.1](https://bitbucket.org/minfos/ref-boilerplate-core/compare/v1.1.0...v1.1.1) (2017-12-08)



<a name="1.1.0"></a>
# [1.1.0](https://bitbucket.org/minfos/ref-boilerplate-core/compare/v1.0.2...v1.1.0) (2017-10-02)


### Features

* **CI:** Enable caching of node_modules in CI ([b3ccb46](https://bitbucket.org/minfos/ref-boilerplate-core/commits/b3ccb46))
* **CI:** Publish a 'dev' prerelease version of the package with every CI build of a 'work-in-progress' branch ([559f633](https://bitbucket.org/minfos/ref-boilerplate-core/commits/559f633))



<a name="1.0.2"></a>
## [1.0.2](https://bitbucket.org/minfos/ref-boilerplate-core/compare/v1.0.1...v1.0.2) (2017-09-11)

### Bug Fixes

* **nyc** Fix code coverage issues introduced by nyc
    ([3a96395](https://bitbucket.org/minfos/store-datasharing-client/commits/3a96395))

* **tslint** Allow submodule imports from @minfos packages
    ([65a31fc](https://bitbucket.org/minfos/store-datasharing-client/commits/65a31fc))

<a name="1.0.1"></a>
## 1.0.1 (2017-08-29)

Development guide
=================

How to build the package
------------------------

### Development build

A standard development build can be created using the 'build' NPM script by
running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run build
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also have live-compilation during development using the 'watch' NPM
script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run watch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How to test the package
-----------------------

### Executing all quality checks

The quality of the package can be verified using the 'test' NPM script by
running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This script will run all the applicable checks and assertions for the package.
Alternatively, a subset of the quality checks can be running as described below.

### Executing code quality checks

Code quality is checked by a process known as 'linting'. The linting process
will check the code for potential errors and non-compliance with syntax
standards. These checks can be run using the 'lint' NPM script by running the
command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run lint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Executing unit (isolation) tests

The application's components can be quality-checked in isolation by executing
their unit tests. The tests can be run in node using the 'unit' variant of the
'test' NPM script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test:unit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These tests can include a code coverage scan-and-check using the 'unit:coverage'
variant of the 'test' NPM script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test:unit:coverage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The code coverage process will output a summary of the coverage metrics to the
console and a web based report into the '`/coverage/`' directory. Open the
`index.html` file to view the report. Alternatively, the scan can be run without
generating the report using the 'unit:coverage:noreport' variant of the 'test'
NPM script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test:unit:coverage:noreport
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that the 'scan' and the 'check' steps can be run separately using the
'unit:coverage:run' and 'unit:coverage:check' variants of the 'test' NPM script.

### Executing specification (integration) tests

The package's specifications can be checked by executing their tests using the
'spec' variant of the 'test' NPM script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test:spec
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specific specification types can be run. For example, it is common for a product
to have feature specifications that describe the features of the product. You
can run the feature specifications using the 'spec:features' variant of the
'test' command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test:spec:features 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Similarly to the unit tests, code coverage metrics can be collected while the
feature specifications are executed using the 'spec:features:coverage' variant
of the 'test' NPM script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run test:spec:features:coverage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Release preparation
-------------------

In order to fully prepare the package as being of "release" quality, the a
release build needs to be generated and subsequent quality control checks need
to pass.

You can run the complete release preparation process using the 'release' NPM
script by running the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run release
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The release build will be published to the package repository by the Continuous
Delivery system. There is not normally a need to publish packages manually.

How to deploy (if applicable)
-----------------------------

### Local deployment

Explain the steps and commands for deploying a build locally

The standard process is to run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm start
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Hosted deployment

Explain the steps and commands for deploying a build to a hosted environment

The standard process is to run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm run deploy {parameters}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using a development build of a package
--------------------------------------

### Building a development build

A semver prerelease package with the prerelease tag 'dev' is published to NPM
for each work-in-progress build by the CI system. The published packages are
tagged with a sanitised copy of the name of the branch from which they were
created. To confirm the name, look in the Pipeline output at the end of the
work-in-progress script for a build for the line:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Published dev package with tag: feature-mon-123-a-branch-name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The work-in-progress builds are considered those that are not in the master or
release/\* branches - such as features and bug fixes.

These prerelease versions can be installed by specifying their tag as the semver
constraint. Unfortunately, when you install with the `npm` command it saves the
version, not the tag, in the package.json file. To get around this, manually
update the package.json file after installation.

To do this, perform the following:

1) Install the package using the tag name. For example. installing `my-package`
from its branch `feature/mon-123-a-branch-name` :

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install --save @minfos/my-package@feature-mon-123-a-branch-name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2) Then update the dependency from a specific version to a tag name:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  "dependencies": {
    "@minfos/my-package": "^1.0.3-dev.57"
  }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

changes to

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  "dependencies": {
    "@minfos/my-package": "feature-mon-123-a-branch-name"
  }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The prerelease version is the pipelines build number. By using the tag name as
the constraint, newer builds in that branch will be available when you update
your dependencies using `npm upgrade`.

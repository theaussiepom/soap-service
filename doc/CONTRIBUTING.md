Contribution guidelines
=======================

Note these instructions are expected to be consistent across all packages.
Please only modify them in the core boilerplate template and then cascade the
changes to all repositories.

 

Coding standards
----------------

Coding standards and conventions are described in the
'[standards](STANDARDS.md)' documentation. These standards are expected to be
followed and verified before the code is merged into the master branch.

Code coverage
-------------

A coverage rating of 100% for all of the statement, branches, functions and
lines metrics is expected and enforced before any contribution will be accepted.

These metrics are measured by the
[Istanbul](https://github.com/gotwarlost/istanbul) code coverage system.

Commits
-------

Commit messages should be written to describe the change being made in an
imperative mood. For example:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Add the tests for validation business logic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

rather than

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Added the tests for the validation business logic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following template outlines some of the recommended practices:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Short (50 chars or less) summary of changes

More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.  In some contexts, the first
line is treated as the subject of an email and the rest of
the text as the body.  The blank line separating the
summary from the body is critical (unless you omit the body
entirely); tools like rebase can get confused if you run
the two together.

Further paragraphs come after blank lines.

  - Bullet points are okay, too

  - Typically a hyphen or asterisk is used for the bullet,
    preceded by a single space, with blank lines in
    between, but conventions vary here
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Refer to the [commit guidelines in the Git
Book](https://git-scm.com/book/ch5-2.html#_commit_guidelines) for more
information.

For significant commits - such as those in the master branch - the [AngularJS
commit message
guidelines](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)
are followed. The first line is used by the [standard-version] tool during the
release process and so should be prefixed with an indicator of the type of
change being made. The template for this is:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{type}({component}): {message}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For example:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
fix(validation): Reject empty input in the login form
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Work lifecycle
--------------

The lifecycle for an individual item of work is:

1.  An issue is created in either JIRA or BitBucket

2.  A branch is created for the issue (see branching conventions in the
    '[standards](STANDARDS.md)' documentation)

3.  Work is committed to the branch

4.  A Pull Request is created in BitBucket to merge the topic branch into the
    master branch, and assigned with one or more approvers. For the Pull Request
    to be approved the following checks must be made:

    1.  The source code complies with the coding standards

    2.  The 'release’ NPM script passes successfully (this compiles the code and
        runs quality checks).

    3.  The code can be merged into the master branch without conflicts, and the
        'release’ NPM script passes successfully when run on the result of the
        merge. A custom 'pre-check’ script is available in BitBucket Pipelines
        to perform this test.

5.  The pull request is merged, and the merge commit’s message is formatted as
    per the [standard-version
    conventions](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance).

6.  The topic branch is optionally closed/removed if it has no further
    significance.

Release process
---------------

The release process will prepare the package and deploy it to the NPM
repository. This is performed by BitBucket Pipelines when it identifies a commit
that is created by the standard-version tool.

In order to create a release, perform the following steps

1.  Determine the new version based on the semantic versioning convention. See
    below for steps on how to do this using an automated tool.

2.  Create a branch with name formatted as 'release/{version}’. For example,
    'release/2.0.1’ from the master branch.

3.  Make any additional changes, if required, in the branch but do not bump the
    version number.

4.  Run the standard-version tool (see below) to bump the version number and
    update the change log document.

5.  Make sure that version bump has been committed, and then push it to the
    repository in BitBucket.

The BitBucket Pipelines tool will check the commit and publish the package to
NPM.

Note: if the BitBucket Pipelines job fails, you will need to remove the commits,
fix the problem, and re-do the versioning. These destructive changes will
require a force-push into BitBucket.

### Pre-releases

A pre-release is a version of the release that can be previewed before the final
release is made. A pre-release is described as a release candidate (type: `rc`)
if it is being made available as a preview of the likely released package from a
release/\* branch, and a beta (type: `beta`) if the work is still in development
in the master or a feature/\* branch.

A pre-release is created in the same manner as a normal release but with the `-p
{type}` parameter passed to the standard-version command.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
standard-version -p rc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

or

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
standard-version -p beta
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Refer to the information below on how to use the standard version tool for more
information.

### Determining the version bump

The server version bump type (major/minor/patch) is determined by reviewing the
history since the previous released version and identifying the maximum bump
type that would be caused by those changes. To assist in this, a standard
convention is used for the messages of merge commits that indicates the type of
change being merged. Refer to the [standard-version
conventions](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance)
for more information.

With these conventions in place, the version bump type can be determined
automatically using the
[conventional-recommended-bump](https://github.com/conventional-changelog/conventional-recommended-bump)
tool by running the following commands:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install -g conventional-recommended-bump
conventional-recommended-bump -p angular
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The output from that last command will be the bump type (major, minor or patch)

### Using the standard-version tool

The standard-version tool is used to make the changes required to trigger a
release.

It :

1.  Identifies the necessary server version bump type

2.  Increments the package’s version

3.  Updates the change log documentation with the significant changes, based on
    the commits’ messages

4.  Creates a new commit with the changed files

5.  Tags that commit with the version ID (e.g. v2.0.1)

After the tool has run, the changes need to be pushed to the central repository.

To use this tool, run the following commands in a release/\* branch:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install -g standard-version
standard-version
git push --follow-tags origin {branch-name}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Where {branch-name} is the name of the current release branch.

If this is the first release for the package, add the parameter `—first-release`
to the standard version command like so:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
standard-version —first-release
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Deployment process
------------------

After a package has been published to NPM it will be deployed, if appropriate,
to a central environment.

Still to come ...

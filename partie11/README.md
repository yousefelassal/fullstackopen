### a Introduction to CI/CD

- [Git Branch](https://www.atlassian.com/git/tutorials/using-branches) | Atlassian Tut

  ```bash
  git branch
  ```
  List all of the branches in your repository. This is synonymous with `git branch --list`.

  ```bash
  git branch <branch>
  ```
  Create a new branch called `＜branch＞`. This does not check out the new branch.

  ```bash
  git checkout -b <branch>
  ```
  Simultaneously creates and checks out `＜branch＞`. The `-b` option is a convenience flag that tells Git to run `git branch` before running `git checkout ＜branch＞`.

  ```bash
  git branch -d <branch>
  ```
  Delete the specified branch. This is a “safe” operation in that Git prevents you from deleting the branch if it has unmerged changes.

  ```bash
  git branch -D <branch>
  ```
  Force delete the specified branch, even if it has unmerged changes. This is the command to use if you want to permanently throw away all of the commits associated with a particular line of development.

  ```bash
  git branch -m <branch>
  ```
  Rename the current branch to `＜branch＞`.

- [Continuous Integration](https://www.martinfowler.com/articles/continuousIntegration.html) | Martin Fowler Articles
- [Continuous integration vs. delivery vs. deployment](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment) | Atlassian

  #### Continuous integration
  Developers practicing continuous integration merge their changes back to the main branch as often as possible.
  The developer's changes are validated by creating a build and running automated tests against the build.

  #### Continuous delivery
  An extension of continuous integration since it automatically deploys all code changes to a testing and/or production environment after the build stage.

  #### Continuous deployment
  Continuous deployment goes one step further than continuous delivery. With this practice, every change that passes all stages of your production pipeline is released to your customers. There's no human intervention, and only a failed test will prevent a new change to be deployed to production.

  ![ci cd asset updates  007](https://github.com/yousefelassal/fullstackopen/assets/76617202/6905fbcb-75ae-41b4-b45b-8f03da127d59)

- [Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows) | Atlassian

  #### Rebasing
  ```bash
  git pull --rebase origin main
  ```
  The `--rebase` option tells Git to move all commits to the tip of the `main` branch after synchronising it with the changes from the central repository.

  #### Resolving a merge conflict
  Git will pause the rebase at the current commit and output the following message, along with some relevant instructions:
  ```bash
  CONFLICT (content): Merge conflict in <some-file>
  ```

  run a `git status` to see where the problem is. Conflicted files will appear in the Unmerged paths section:
  ```bash
  # Unmerged paths:
  # (use "git reset HEAD <some-file>..." to unstage)
  # (use "git add/rm <some-file>..." as appropriate to mark resolution)
  #
  # both modified: <some-file>
  ```
  
  edit the file(s) to liking. Once happy with the result, stage the file(s) in the usual fashion and let `git rebase` do the rest:
  ```bash
  git add <some-file>
  git rebase --continue
  ```
  And that’s all there is to it. Git will move on to the next commit and repeat the process for any other commits that generate conflicts.
  
  If you get to this point and realize and you have no idea what’s going on, don’t panic. Just execute the following command and you’ll be right back to where you started:
  ```bash
  git rebase --abort
  ```

### b Getting started with GitHub Actions

- [Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) | GitHub Docs

  ![xa9cnqtt](https://github.com/yousefelassal/fullstackopen/assets/76617202/2fac3bc9-57fd-431d-9000-c9576845608e)

  - _workflow_ is triggered when an event occurs in your repository, such as a pull request being opened or an issue being created.
  - Your workflow contains one or more _jobs_ which can run in sequential order or in parallel.
  - Each job will run inside its own virtual machine _runner_, or inside a container, and has one or more steps that either run a script that you define or run an _action_.

  Example:
  ```yaml
  name: learn-github-actions
  run-name: ${{ github.actor }} is learning GitHub Actions
  on: [push]
  jobs:
    check-bats-version:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v3
          with:
            node-version: '14'
        - run: npm install -g bats
        - run: bats -v
  ```
  ![hddtyzsf](https://github.com/yousefelassal/fullstackopen/assets/76617202/27acd106-4ba6-4131-96d4-a21148aa3a59)

  
- [YAML Syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html) | Ansible Docs

  nearly every YAML file starts with a list. Each item in the list is a list of key/value pairs, commonly called a “hash” or a “dictionary”.

  All members of a list are lines beginning at the same indentation level starting with a "- " (a dash and a space):
  ```yaml
  ---
  # A list of tasty fruits
  - Apple
  - Orange
  - Strawberry
  - Mango
  ...
  ```

  A dictionary is represented in a simple key: value form (the colon must be followed by a space):
  ```yaml
  # An employee record
  martin:
    name: Martin D'vloper
    job: Developer
    skill: Elite
  ```
  
  More complicated data structures are possible, such as lists of dictionaries, dictionaries whose values are lists or a mix of both:
  ```yaml
  # Employee records
  - martin:
      name: Martin D'vloper
      job: Developer
      skills:
        - python
        - perl
        - pascal
  - tabitha:
      name: Tabitha Bitumen
      job: Developer
      skills:
        - lisp
        - fortran
        - erlang
  ```

- [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) | GitHub Docs

  #### `schedule`
  The `schedule` event allows you to trigger a workflow at a scheduled time.
  
  Cron syntax has five fields separated by a space, and each field represents a unit of time.

  This example triggers the workflow every day at 5:30 and 17:30 UTC:
  ```yml
  on:
    schedule:
      # * is a special character in YAML so you have to quote this string
      - cron:  '30 5,17 * * *'
  ```
  
  ```text
  ┌───────────── minute (0 - 59)
  │ ┌───────────── hour (0 - 23)
  │ │ ┌───────────── day of the month (1 - 31)
  │ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
  │ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
  │ │ │ │ │
  │ │ │ │ │
  │ │ │ │ │
  * * * * *
  ```
  
  You can use these operators in any of the five fields:
  
  | Operator | Description | Example |
  | -------- | ----------- | ------- |
  | * | Any value | `15 * * * *` runs at every minute 15 of every hour of every day. |
  | , | Value list separator | `2,10 4,5 * * *` runs at minute 2 and 10 of the 4th and 5th hour of every day. |
  | - | Range of values | `30 4-6 * * *` runs at minute 30 of the 4th, 5th, and 6th hour. |
  | / | Step values | `20/15 * * * *` runs every 15 minutes starting from minute 20 through 59 (minutes 20, 35, and 50). |
  
  
  You can use [crontab guru](https://crontab.guru/) to help generate your cron syntax and confirm what time it will run. To help you get started, there is also a list of [crontab guru examples](https://crontab.guru/examples.html).

- [`uses`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses) | GitHub Docs

  a reusable unit of code, either JavaScript files or Docker containers.

  ```yml
  steps:
    # Reference a specific commit
    - uses: actions/checkout@8f4b7f84864484a7bf31766abe9204da3cbe65b3
    # Reference the major version of a release
    - uses: actions/checkout@v4
    # Reference a specific version
    - uses: actions/checkout@v4.2.0
    # Uses the default branch of a public repository
    - uses: actions/heroku@main
    # Uses a specific version tag of a public repository
    - uses: actions/aws@v2.0.1
  ```
- [`with`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswith) | GitHub Docs

  A map of the input parameters defined by the action. Each input parameter is a key/value pair.

  ```yml
  jobs:
    my_first_job:
      steps:
        - name: Setup node
          uses: actions/setup-node@v4
          with:
            node-version: '20'
  ```
  After the environment has been set up we can run all the scripts from `package.json` like we would on our own machine. 

- [`cypress.io/github-action`](https://github.com/cypress-io/github-action) | Cypress GitHub Action Repo

  ```yml
  - name: e2e tests
      uses: cypress-io/github-action@v5
      with:
        command: npm run test:e2e
        start: npm run start-prod
        wait-on: http://localhost:5000
  ```

  - [`command`](https://github.com/cypress-io/github-action#custom-test-command): specifies how to run Cypress tests
  - [`start`](https://github.com/cypress-io/github-action#start-server): gives npm script that starts the server
  - [`wait-on`](https://github.com/cypress-io/github-action#wait-on): says that before the tests are run, the server should have started on url _http://localhost:5000_.

### c Deployment

- [UNIX File Permissions](https://www.guru99.com/file-permissions.html) | Guru99

using a shell command for running several commands in the build or start command:

Create eg. a file _build_step.sh_ with the following content:
```bash
#!/bin/bash

echo "Build script"
npm install
npm run build
```

```bash
$ ./build_step.sh
Build script
```
- [Deploy hook](https://docs.render.com/deploy-hooks) | Render Docs

  trigger an on-demand deploy with a single HTTP request.

  ```yml
  # .github/workflows/ci.yml
  
  on:
    pull_request:
    push:
      branches: [main]
  
  jobs:
    ci:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Test
          run: |
            npm install
            npm run test
  
        - name: Deploy
          # Only run this step if the branch is main
          if: github.ref == 'refs/heads/main'
          env:
            deploy_url: ${{ secrets.RENDER_DEPLOY_HOOK_URL }}
          run: |
            curl "$deploy_url"
  ```
- [Zero Downtime Deploys](https://docs.render.com/deploys#zero-downtime-deploys) | Render Docs

  Running quick sanity checks (like a simple database query) and returning an “OK” `200` response or an empty `204` response if the app is healthy.

  A health check is considered successful when the health check path returns a response code between `200` and `399`. Any other code (or a timeout) causes it to fail.

- [HTTP Check](https://fly.io/docs/reference/configuration/#http_service-checks) | Fly.io Docs

### d Keeping green

- [`pull_request` workflow trigger](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request) | GitHub Docs

  By default, a workflow only runs when a `pull_request` event's activity type is `opened`, `synchronize`, or `reopened`. 
  ```yml
  on:
    pull_request:
      branches: [main]
      types: [opened, synchronize]
  ```
- [`if` job](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsif) | GitHub Docs

  #### Example: Using contexts
  This step only runs when the event type is a `pull_request` and the event action is unassigned.
  ```yml
  steps:
    - name: My first step
      if: ${{ github.event_name == 'pull_request' && github.event.action == 'unassigned' }}
      run: echo This event is a pull request that had an assignee removed.
  ```
  
  #### Example: Using status check functions
  The my backup step only runs when the previous step of a job fails.
  ```yml
  steps:
    - name: My first step
      uses: octo-org/action-name@main
    - name: My backup step
      if: ${{ failure() }}
      uses: actions/heroku@1.0.0
  ```
  
  #### Example: Using secrets
  Secrets cannot be directly referenced in `if:` conditionals. Instead, consider setting secrets as job-level environment variables, then referencing the environment variables to conditionally run steps in the job.
  
  If a secret has not been set, the return value of an expression referencing the secret (such as `${{ secrets.SuperSecret }}` in the example) will be an empty string.
  ```yml
  name: Run a step if a secret has been set
  on: push
  jobs:
    my-jobname:
      runs-on: ubuntu-latest
      env:
        super_secret: ${{ secrets.SuperSecret }}
      steps:
        - if: ${{ env.super_secret != '' }}
          run: echo 'This step will only run if the secret has a value set.'
        - if: ${{ env.super_secret == '' }}
          run: echo 'This step will only run if the secret does not have a value set.'
  ```
- [`github` Context](https://docs.github.com/en/actions/learn-github-actions/contexts#github-context) | GitHub Docs

- [Semantic Versioning](https://semver.org/) | Semver

    a version would take the form `{major}.{minor}.{patch}`

  1. **MAJOR** version when you make incompatible API changes
  2. **MINOR** version when you add functionality in a backward compatible manner
  3. **PATCH** version when you make backward compatible bug fixes

- [`git tag`](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) | Atlassian Tuts

  Tags are ref's that point to specific points in Git history. Tagging is generally used to capture a point in history that is used for a marked version release (i.e. v1.0.1).

  Git supports two different types of tags, _annotated_ and _lightweight_ tags.

  - **Annotated** **tags** store extra meta data such as: the tagger name, email, and date.
    
    ```bash
    git tag -a v1.4
    ```
    The command will then open up the configured default text editor to prompt for further meta data input.
    ```bash
    git tag -a v1.4 -m "my version 1.4"
    ```
    This is a convenience method similar to `git commit -m` that will immediately create a new tag and forgo opening the local text editor in favor of saving the message passed in with the `-m` option.
    
  - **Lightweight** **tags** are essentially 'bookmarks' to a commit, they are just a name and a pointer to a commit, useful for creating quick links to relevant commits.
 
    ```bash
    git tag v1.4-lw
    ```
    Lightweight tags create a new tag checksum and store it in the .git/ directory of the project's repo.

- [Creating dependent jobs](https://docs.github.com/en/actions/using-workflows/about-workflows#creating-dependent-jobs) | GitHub Docs

  By default, the jobs in your workflow all run in parallel at the same time. If you have a job that must only run after another job has completed, you can use the `needs` keyword to create this dependency.

  ```yml
  jobs:
    setup:
      runs-on: ubuntu-latest
      steps:
        - run: ./setup_server.sh
    build:
      needs: setup
      runs-on: ubuntu-latest
      steps:
        - run: ./build_server.sh
    test:
      needs: build
      runs-on: ubuntu-latest
      steps:
        - run: ./test_server.sh
  ```

- [`contains( search, item )`](https://docs.github.com/en/actions/learn-github-actions/expressions#contains) | GitHub Docs

  Returns `true` if `search` contains `item`. If `search` is an array, this function returns `true` if the `item` is an element in the array. If `search` is a string, this function returns `true` if the `item` is a substring of `search`. This function is not case sensitive.
  
  #### Example using a string
  `contains('Hello world', 'llo')` returns `true`.
  
  #### Example using an object filter
  `contains(github.event.issue.labels.*.name, 'bug')` returns `true` if the issue related to the event has a label "bug".

- [`join( array, optionalSeparator )`](https://docs.github.com/en/actions/learn-github-actions/expressions#join) | GitHub Docs

  The value for `array` can be an array or a string. All values in array are concatenated into a string. If you provide `optionalSeparator`, it is inserted between the concatenated values. Otherwise, the default separator `,` is used.
  
  #### Example of join
  `join(github.event.issue.labels.*.name, ', ')` may return 'bug, help wanted'

### e Expanding Further
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) | GitHub Marketplace
- [Status check](https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions) | GitHub Docs

  #### `success`
  Returns `true` when all previous steps have succeeded.
  ```yml
  steps:
    ...
    - name: The job has succeeded
      if: ${{ success() }}
  ```

  #### `failure`
  Returns `true` when any previous step of a job fails. If you have a chain of dependent jobs, `failure()` returns `true` if any ancestor job fails.
  
  ```yml
  steps:
    ...
    - name: The job has failed
      if: ${{ failure() }}
  ```
- [Interactive Messaging](https://api.slack.com/messaging/interactivity) | Slack API
- [Building with Block Kit](https://api.slack.com/block-kit/building) | Slack API
- [Slack Block Kit Builder](https://api.slack.com/tools/block-kit-builder) | Slack API
- [slack-send](https://github.com/marketplace/actions/slack-send) | GitHub Action

  #### Setup
  1. [Create a Slack App](https://api.slack.com/apps) for your workspace (alternatively use an existing app you have already created and installed).
  2. Add the [incoming-webhook](https://api.slack.com/scopes/incoming-webhook) bot scope under **OAuth & Permissions**.
  3. Install the app to your workspace (you will select a channel to notify).
  4. Activate and create a new webhook under **Incoming Webhooks**.
  5. Copy the Webhook URL from the Webhook you just generated add it as a secret in your repo settings named `SLACK_WEBHOOK_URL`.

  #### Usage
  ```yml
  - name: Send custom JSON data to Slack workflow
    id: slack
    uses: slackapi/slack-github-action@v1.25.0
    with:
      # For posting a rich message using Block Kit
      payload: |
        {
          "text": "GitHub Action build result: ${{ job.status }}\n${{ github.event.pull_request.html_url || github.event.head_commit.url }}",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "GitHub Action build result: ${{ job.status }}\n${{ github.event.pull_request.html_url || github.event.head_commit.url }}"
              }
            }
          ]
        }
    env:
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
      SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
  ```

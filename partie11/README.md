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

# ParkProject
PCC CIS 193 Class Group Project Fall 2019

# Git:

Git can be managed using a desktop user interface such as "GitHub Desktop" or using the shell (command prompt, bash, terminal) with the "git" protocol installed natively to your OS.

Git is the protocol, GitHub is a host (cloud server that stores your repositories).

Repository - set of files associated with a project along with under-the-hood hidden .git files (which track the changes, branches, etc.).

### Installing Git:

Git can be run from the shell by installing "git" at the computer level:
Download and install here: [Git Download][git]

### Installing Git Desktop:

Git can be run from a User Interface (desktop client).
Download Git Desktop by the following: [GitHub Desktop Download][github-desktop]


## Forking and Cloning the Repository with Proper Security

### Step 1: Get added as a member of the GitHub repository

In the Google Doc, add your GitHub name to the table and we'll add you as a member/contributor to the GitHub repository. (Currently not necessary, but we may soon make it private so only approved contributors can join project).

Once you have accepted github invite (comes via email), please do the following:

Mark your own membership public
https://help.github.com/en/articles/publicizing-or-hiding-organization-membership#changing-the-visibility-of-your-organization-membership

Setup two factor authentication on your account
https://github.com/hackforla/governance/issues/20 (edited)

### Step 2: Fork the Repository

In https://github.com/McRawly/ParkProject, look for the fork icon in the top right (next to (un)Watch and Star). Click Fork button and create a fork of the repository.

For git beginners, a fork is a copy of the repository that will be placed on your GitHub account.
It should create a copy here: https://github.com/your_GitHub_user_name/ParkProject, where your_GitHub_user_name is replaced with exactly that.

Note that this copy is on a remote server on the GitHub website and not on your computer yet.
If you click the Fork icon again, it will not create a new fork but instead give you the URL associated with your fork.

### Step 3: Clone YOUR online repository (fork) to your local computer

For git beginners, this process will create a third copy of the repository on your local desktop.

First create a new folder on your desktop that will contain the CIS193 project.
Try to make sure there are no spaces in the directory names.
I placed my folder here: E:\CIS193.

#### Clone approach 1 of 2: Clone via Shell (Command Line, Bash, or Terminal)

First install "Git" to your OS. See instructions above for "Git Download" above.

In your shell, navigate to class project folder: (cd = change directory on Windows Command Prompt)

```command prompt
cd E:\CIS193
```

then run the following commands:

```bash
git clone https://github.com/your_github_user_name/ParkProject.git
```

If "git" command is unrecognized, you don't have git installed on your computer. Recall that "git" and "GitHub desktop" are different.

You should now have a new folder in your CIS193 folder called "ParkProject".

By default, it will upload (push) back to where you cloned from. So...
If you accidentally cloned the McRawly/ParkProject.git, change to your_user_name/ParkProject.git by the following:

```bash
git remote set-url origin  https://github.com/your_user_name/ParkProject.git
```

This will check which URL you're pointing to:

```bash
git remote show origin
```

#### Clone approach 2 of 2: Clone using Git Desktop

Install Git Desktop (see instructions above). Be sure to be logged into your GitHub account and a fork has been made.

In your repository folder (https://github.com/your_user_name/ParkProject/), find the GREEN CLONE button. Click it and click HTTPS link so you get a new link that looks like "https://github.com/your_user_name/ParkProject.git".

In the GitHub Desktop Client, File > Clone Repository....

In the GitHub tab you might see a "your_user_name/Park Project" link. Click it and follow instructions to paste it into a folder under the CIS193 folder. If you browse and select the CIS193 folder, then the user interface will auto-generate "ParkProject" subfolder.

Click Clone and it will copy the files for you.

### Step 4: Change to a new branch!

For each page (.html file), we'll try to create a new branch.

This command will let you know available branches and which branch you're on.
Star (*) indicates which branch you're on

```bash
git branch
```

By default you should start on the 'master' branch.
This command will (create and) change to a new branch:

```bash
git checkout -b alerts-page
```

We prefer that you work on a branch name that relates to the page you're working on.
The format should look like the scheme above. No law of physics will break if you don't adhere to this scheme but laws of git will break if you add spaces.

## Incorporating changes from upstream

Your fork of this repository on GitHub, and your local clone of that fork, will
get out of sync with this (upstream) repository from time to time.

A few `git` commands is all it takes to get your local clone up to date.
Assuming you have a local clone with remotes `upstream` (this repo) and `origin`
(your GitHub fork of this repo):

```bash
# WARNING: this will erase local pending changes!
# commit them to a different branch or use git stash
git checkout gh-pages
git fetch upstream
git reset --hard upstream/gh-pages
```

Creating a new branch for feature/bugfix work now results in a clean, easy merge
down the line.

Now that local is up to date with `upstream`, update your GitHub fork with:

```bash
git push --force origin/gh-pages
```
## Making changes, committing and pushing

The general process of making changes to the website is to make changes on your local repository of your fork in your own branch.

Then commit those changes with a comment related to the issue it addresses to your local repository (or the updates you made).

Then 'push' that 'commit' to YOUR online fork (.git).

Then go to the McRawly repository and create a PULL request which asks McRawly (project manageR) to pull changes from YOUR fork into their repository.

Therefore all changes are made on your copy and only after the owner of the ParkProject website approves and pulls your changes will updates be made.

New git users: please ask around for guidance here. See the commit and push commands.


[git]: https://git-scm.com/downloads
[github-desktop]: https://desktop.github.com/

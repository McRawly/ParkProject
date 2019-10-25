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

In the Google Doc, add your GitHub name to the table and we'll add you as a member/contributor to the GitHub repository. 

Very important for Pushing!

Once you have accepted github invite (comes via email, or inbox on GitHub), please do the following:

Mark your own membership public
https://help.github.com/en/articles/publicizing-or-hiding-organization-membership#changing-the-visibility-of-your-organization-membership

Setup two factor authentication on your account
https://github.com/hackforla/governance/issues/20 (edited)

### Step 2: DO NOT Fork the Repository

For git beginners, a fork is a copy of the repository that will be placed on your GitHub account.
Note that a fork is a copy on a remote server on the GitHub website and not on your local computer.
It is often used when a main website will be managed by one approver.
We will all work directly on the McRawly GitHub repository, so we will not Fork.

### Step 3: Clone McRawly repository to your local computer

For git beginners, this process will create a local copy of the repository on your desktop/laptop.

Create a new folder on your desktop that will contain the CIS193 project.
Try to make sure there are no spaces in the directory names.
I placed my folder here: E:\CIS193.

Next Clone using one of the two approaches below depending on whether you installed "git" or "GitHub Desktop".

#### Clone approach 1 of 2: Clone via Shell (Command Line, Bash, or Terminal)

First install "Git" to your OS. See instructions above for "Git Download" above.

In your shell, navigate to class project folder: (cd = change directory on Windows Command Prompt)

```command prompt
cd E:\CIS193
```

then run the following commands:

```bash
git clone https://github.com/McRawly/ParkProject.git
```

If "git" command is unrecognized, you don't have git installed on your computer. Recall that "git" and "GitHub desktop" are different.

You should now have a new folder in your CIS193 folder called "ParkProject".

By default, it will upload (push) back to where you cloned from. So...
If you accidentally cloned the McRawly/ParkProject.git, change to your_user_name/ParkProject.git by the following:

```bash
git remote set-url origin  https://github.com/McRawly/ParkProject.git
```

This will check which URL you're pointing to:

```bash
git remote show origin
```

#### Clone approach 2 of 2: Clone using Git Desktop

Install Git Desktop (see instructions above). Be sure to be logged into your GitHub account.

In the repository page (https://github.com/McRawly/ParkProject/), find the GREEN CLONE button. Click it and click HTTPS link so you get a new link that looks like "https://github.com/McRawly/ParkProject.git". Copy it or click the icon that will copy it to your clipboard. 

In the GitHub Desktop Client, File > Clone Repository....

In the GitHub tab you might see a "your_user_name/Park Project" link (if and only if you had Forked the project, which you should not have). Click it and follow instructions to paste it into a folder under the CIS193 folder. If you browse and select the CIS193 folder, then the user interface will auto-generate "ParkProject" subfolder.

Click Clone and it will copy the files for you.

### Step 4: Change to a new branch!

For each page (.html file), we'll try to create a new branch.

#### Aproach 1 of 2: Git Commands
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

#### Approach 2 of 2: GitHub Desktop

Menu > Branch > New Branch...

```bash
alerts-page
```

We prefer that you work on a branch name that relates to the page you're working on.
The format should look like the scheme above. No law of physics will break if you don't adhere to this scheme but laws of git will break if you add spaces.

## Opening the project in your code editor.

#### Approach 1 of 2: Git

If you're using git, then just open the project code in your editor directly. Git will find the changes automatically when needed. 

#### Approach 2 of 2: GitHub Desktop

Menu > Repository > Open in Atom ...

If Visual Studio Code is installed, then you might get that link. If Notepad++ is installed, it's unlikely you'll get a nice link in GitHub desktop. Just open the code and modify it however, and when you come back to the Desktop, you'll see the changes. 

## Incorporating changes from upstream (Fetch and Pulls)

Your local clone of the repository, will get out of sync with this (upstream) repository from time to time. 

A few `git` commands is all it takes to get your local clone up to date.
Fetch will show you what's different from your local and the server repositories.
Pull will copy from the server repository to your local copy, overwriting the existing files (you will lose all uncommitted changes).
Using the desktop client my prompt you if you have uncommitted changes before executing the pull. 

```bash
# WARNING: this will erase local pending changes!
# commit them to a different branch or use git stash
git fetch
git pull
```

This is to make sure you have the latest files, but a 'pull' command will overwrite all files. So there is a "stash" function that allows you to store uncommitted changes. 

Using the GitHub Desktop, it should just be clicking the "Fetch" tab, then clicking "Pull" if it changes from "Fetch" to "Pull". 

## Making changes, committing and pushing

The general process of making changes to the website is to make changes on your local repository of your fork in your own branch.

Then commit those changes with a comment related to the issue it addresses to your local repository (or the updates you made).

Then 'push' that 'commit' to the online repository.

### Approach 1 of 2: Git Commit and Push

Using Git from shell:

Check your changes and which repository you're pushing to:

```bash
git status
git branch
git remote show origin
```

Make sure you're on YOUR branch and not the 'master' branch! 
(check using "git branch")

Switch to your branch:

```bash
git checkout my-branch
```

Make sure you're uploading to project repository 
(check using "git remote show origin")

Switch to class repository:

```bash
git remote set-url origin  https://github.com/McRawly/ParkProject.git 
```

Find files ("add" all), commit with message, then push.

```bash
git add .
git commit -m "Read me update Oct 22, 2019 2:30pm with GIT help"
git push
```

or using the "-a" commit parameter instead of "add" function.

```bash
git commit -a -m "Read me update Oct 22, 2019 2:30pm with GIT help"
git push
```


### Approach 2 of 2: GitHub Desktop, Commit and Push

Change your repository to "ParkProject". 

Change your branch to YOUR BRANCH (ex: alerts-page), NOT master. 

Click "Changes" sub-tab of "Current Repository" tab so see the changes you've made.

At the bottom will be fields with placeholders: "Summary (required)" and "Description". Fill these in as the Message for the files to commit. The summary can be a one line description like "Updated alerts-page branch" and the description can be "added X functionality, removed files related to Y, and more." 

Click "Commit".

The "Fetch" tab will have changed to "Push". You can click that tab or the GREEN "Push" button on the right side to push to the cloud. 

NOTE: If you don't want to upload all changes you made (such as temporary .PSD Photoshop files or word documents) then you can "Stash" those files away using the "Stash" functions. Then "unstash" then after the commit. It will probably be best to store large files that will not be displayed on any page of our website in a folder outside this repository. 

[git]: https://git-scm.com/downloads
[github-desktop]: https://desktop.github.com/

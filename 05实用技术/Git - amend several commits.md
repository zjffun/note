---
date: 'Fri, 27 May 2022 08:51:37 GMT'
updated: 'Sat, 28 May 2022 09:08:54 GMT'
---

# git-filter-repo

## Installation

```bash
pip install git-filter-repo
```

## Usage

```bash
git filter-repo --commit-callback '
    if commit.author_email == b"incorrect@email":
        commit.author_email = b"correct@email"
        commit.author_name = b"Correct Name"
        commit.committer_email = b"correct@email"
        commit.committer_name = b"Correct Name"
'
```

# git-filter-branch(deprecated)

```bash
git filter-branch --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "incorrect@email" ]; then
     GIT_AUTHOR_EMAIL=correct@email;
     GIT_AUTHOR_NAME="Correct Name";
     GIT_COMMITTER_EMAIL=$GIT_AUTHOR_EMAIL;
     GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; fi' -- --all
```

See:

-   [How to amend several commits in Git to change author - Stack Overflow](https://stackoverflow.com/a/69947947)

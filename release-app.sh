#!/bin/sh
git checkout master
git merge latest

VERSION="v"
VERSION+=$(jq -r .version ./app/package.json)

LASTTAG=$(git describe --tags --abbrev=0)

echo "Check if Tag $VERSION exists"
if GIT_DIR=.git git rev-parse $VERSION >/dev/null 2>&1
then
# Found
    echo "Version $VERSION already exists - please change it in the package.json and dont commit the change"
else
# Not Found
    git commit -am "$VERSION"
    git tag "$VERSION"
    git push && git push --tags
    git checkout latest
    git merge master

    echo "## Changelog:"
    if [ -z "$1" ]; then
      echo $(git log --pretty=format:%s "$LASTTAG"..HEAD | grep -E "FIX:|ADD:|FEATURE:|BREAK:" | awk '{print "\\n- "$0}')
    else 
      echo $(git log --pretty=format:%s "$LASTTAG"..HEAD | grep -E "FIX:|ADD:|FEATURE:|BREAK:" | awk '{print "\\n- "$0}')
    fi

    open "https://github.com/FreaKzero/ssgl-doom-launcher/actions"
fi
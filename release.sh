# git checkout latest
# git pull
# git checkout master
# git pull
# git merge latest

VERSION="v"
VERSION+=$(jq -r .version ./app/package.json)

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
    open "https://github.com/FreaKzero/ssgl-doom-launcher/actions"
fi
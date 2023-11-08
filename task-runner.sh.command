#!/bin/bash
#####################
# Task Runner       #
# pretty-print-json #
#####################

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="pretty-print-json"
projectHome=$(cd $(dirname $0); pwd)

setupTools() {
   # Check for Node.js installation and download project dependencies
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   test -d .git || { echo "Project must be in a git repository."; exit; }
   git restore dist/* &>/dev/null
   git pull --ff-only
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install --no-fund
   npm update --no-fund
   npm outdated
   echo
   }

releaseInstructions() {
   cd $projectHome
   org=$(grep git+https package.json | awk -F'/' '{print $4}')
   name=$(grep '"name":' package.json | awk -F'"' '{print $4}')
   package=https://raw.githubusercontent.com/$org/$name/main/package.json
   version=v$(grep '"version"' package.json | awk -F'"' '{print $4}')
   pushed=v$(curl --silent $package | grep '"version":' | awk -F'"' '{print $4}')
   minorVersion=$(echo ${pushed:1} | awk -F"." '{ print $1 "." $2 }')
   released=$(git tag | tail -1)
   published=v$(npm view $name version)
   test $? -ne 0 && echo "NOTE: Ignore error if package is not yet published."
   echo "Local changes:"
   git status --short
   echo
   echo "Recent releases:"
   git tag | tail -5
   echo
   echo "Release progress:"
   echo "   $version (local) --> $pushed (pushed) --> $released (released) --> $published (published)"
   echo
   test "$version" ">" "$released" && mode="NOT released" || mode="RELEASED"
   echo "Current version is: $mode"
   echo
   nextActionBump() {
      echo "When ready to do the next release:"
      echo
      echo "   === Increment version ==="
      echo "   Edit package.json to bump $version to next version number"
      echo "   $projectHome/package.json"
      }
   nextActionCommitTagPub() {
      echo "Verify all tests pass and then finalize the release:"
      echo
      echo "   === Commit and push ==="
      echo "   Check in all changed files with the message:"
      echo "   Release $version"
      echo
      echo "   === Tag and publish ==="
      echo "   cd $projectHome"
      echo "   git tag --annotate --message 'Release' $version"
      echo "   git remote --verbose"
      echo "   git push origin --tags"
      echo "   npm publish"
      }
   test "$version" ">" "$released" && nextActionCommitTagPub || nextActionBump
   echo
   }

updateReadme() {
   cd $projectHome
   sed -i "" "s/pretty-print-json@[0-9][.][0-9]/pretty-print-json@$minorVersion/" README.md
   }

buildProject() {
   cd $projectHome
   echo "Build:"
   npm test
   echo "To see examples:"
   echo "   node spec/examples.js"
   echo
   }

setupTools
releaseInstructions
updateReadme
buildProject
sleep 2
open spec/interactive.html

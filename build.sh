#!/bin/bash

rm -rf ~/Library/Application\ Support/nOS

rm -rf ./src.* && rm -rf dist/*

yarn build && cp dist/* .

sed -i '' -e 's/\/src./src./g' index.html

git add . && git commit -m "update" && git push origin master

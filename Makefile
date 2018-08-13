remove-cache:
	rm -rf ~/Library/Application\ Support/nOS
.PHONY: remove-cache

dev-server: remove-cache
	python -m SimpleHTTPServer 1234
.PHONY: dev-server

build: remove-cache
	rm -rf ./src.* && rm -rf dist/* &&\
	yarn build && cp dist/* . &&\
	sed -i '' -e 's/\/src./src./g' index.html
.PHONY: build

push:
	git add . && git commit -m "rebuild and deploy" && git push origin master
.PHONY: push

deploy: build push
.PHONY: deploy

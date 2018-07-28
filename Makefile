init-precommit:
	pre-commit install
	pre-commit autoupdate
.PHONY: init-precommit

init-yarn:
	yarn install --no-lockfile
.PHONY: init-yarn

init: init-precommit init-yarn
.PHONY: init

clean:
	lein clean
.PHONY: clean

deps: clean
	lein deps
.PHONY: deps

lint:
	lein cljfmt fix
.PHONY: lint

generate-index: build-css-dev
	lein trampoline run -m dev/generate-index
.PHONY: generate-index

dev-cljs: generate-index
	# open https://dev.housinghost:4444/cards.html
	# lein trampoline run -m dev/generate-index
	# lein figwheel dev devcards
	lein figwheel dev devcards
.PHONY: dev-cljs

dev-css:
	lein garden auto
.PHONY: dev-css

dev: deps build-cljs-prod build-css-dev version-files
	lein run-dev
.PHONY: dev

test-cljs:
	/bin/rm -rf resources/public/cljs/test && lein doo default once
.PHONY: test-cljs

test-clj:
	lein run-test
.PHONY: test-clj

test: test-cljs test-clj
.PHONY: test

build-jar:
	export LEIN_SNAPSHOTS_IN_RELEASE=1 &&\
	lein with-profile production uberjar
.PHONY: build-jar

build: build-cljs-prod build-css  build-jar
.PHONY: build

build-docker:
	cp -R resources ~/dev/devops/docker/docker-realestate/app/
	cp config.clj ~/dev/devops/docker/docker-realestate/app/
	cp target/app.jar ~/dev/devops/docker/docker-realestate/app/
.PHONY: build-docker

build-cljs-prod:
	rm -rf resources/public/js/site*
	rm -rf resources/public/css/site-*.css
	lein with-profile production cljsbuild once production
	lein buster
.PHONY: build-cljs-prod

version-files:
	lein buster
.PHONY: version-files

build-css:
	lein garden once production
.PHONY: build-css

build-css-dev:
	lein garden once
.PHONY: build-css-dev

debug-server: build
	java -jar target/app.jar
.PHONY: debug-server

nginx:
	nginx -c `pwd`/etc/nginx.conf
.PHONY: nginx

ssh:
.PHONY: ssh

deploy: build
	./scripts/deploy.sh
.PHONY: deploy


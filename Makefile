BROWSERS = chrome firefox

BUILDS := $(patsubst %, build-%,$(BROWSERS))
COPIES := $(patsubst %, copy-%,$(BROWSERS))
CLEANS := $(patsubst %, clean-%,$(BROWSERS))
BUMP_VERSIONS := $(patsubst %, bump-version-%,$(BROWSERS))

.PHONY: $(COPIES) $(CLEANS) $(BUILDS) $(BUMP_VERSIONS)\
	build-all\
	format-all\
	bump-all

$(CLEANS): clean-%:
	@echo Cleaning $* folder...
	@find $*/* | grep -v -E "browser.js|manifest.json" | xargs rm -rf
	@echo ... Clean Done

$(COPIES): copy-%: clean-%
	@echo Copying source files...
	@cp src/* $*
	@cp -r images $*
	@echo ... Copy Done

$(BUMP_VERSIONS): bump-version-%:
	@tmp=$(mktemp)
	@version=$(cat VERSION)
	@jq '.version = "'$$(< VERSION)'"' $*/manifest.json > "$tmp" && mv "$tmp" $*/manifest.json

build-chrome: copy-chrome

build-firefox: copy-firefox
	@echo Zipping...
	@cd firefox; zip -r airflow-extension.zip *; cd ..
	@echo ... Zip Done

clean-all: $(CLEANS)

build-all: $(BUILDS)

bump-all: $(BUMP_VERSIONS)

format-all:
	@echo Formatting src files...
	@prettier --write src
	@echo ... Format Done


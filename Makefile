BROWSERS = chrome firefox

BUILDS := $(patsubst %, build-%,$(BROWSERS))
COPIES := $(patsubst %, copy-%,$(BROWSERS))
CLEANS := $(patsubst %, clean-%,$(BROWSERS))

.PHONY: $(COPIES) $(CLEANS) $(BUILDS)\
	build-all\
	format-all

$(CLEANS): clean-%:
	@echo Cleaning $* folder...
	@find $*/* | grep -v -E "browser.js|manifest.json" | xargs rm -rf
	@echo ... Clean Done

$(COPIES): copy-%: clean-%
	@echo Copying source files...
	@cp src/* $*
	@cp -r images $*
	@echo ... Copy Done

build-chrome: copy-chrome

build-firefox: copy-firefox
	@echo Zipping...
	@cd firefox; zip -r airflow-extension.zip *; cd ..
	@echo ... Zip Done

clean-all: $(CLEANS)

build-all: $(BUILDS)

format-all:
	@echo Formatting src files...
	@prettier --write src
	@echo ... Format Done


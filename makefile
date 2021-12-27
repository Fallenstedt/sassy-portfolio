HUGO_CMD=hugo


all: clean build_hugo
clean:
	@echo "removing public/"
	-rm -rf public/
	@echo "public/ removed"
build_hugo:
	@echo "building to /public"
	${HUGO_CMD}
	@echo "built to /public"


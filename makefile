HUGO_CMD=hugo
WEBPACK_CMD=npm run build:webpack
S3=aws s3
BUCKET=s3://fallenstedt.com


all: clean build_web build_hugo purge upload
clean:
	@echo "Removing public/"
	-rm -rf public/
	@echo "public/ removed"
build_web:
	@echo "building webpack in production mode"
	${WEBPACK_CMD}
	@echo "finished build webpack in production mode"
build_hugo:
	@echo "Building to /public"
	${HUGO_CMD}
	@echo "Built to /public"
purge:
	@echo "Cleaning S3 Bucket"
	${S3} rm ${BUCKET} --recursive
	@echo "Cleaned S3 Bucket"
upload:
	@echo "Uploading to S3 Bucket"
	${S3} sync public ${BUCKET}
	@echo "Done"

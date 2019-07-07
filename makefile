HUGOCMD=hugo
S3=aws s3
BUCKET=s3://fallenstedt.com


all: clean build purge upload
clean:
	@echo "Removing public/"
	-rm -rf public/
	@echo "public/ removed"
build:
	@echo "Building to /public"
	${HUGOCMD}
	@echo "Built to /public"
purge:
	@echo "Cleaning S3 Bucket"
	${S3} rm ${BUCKET} --recursive
	@echo "Cleaned S3 Bucket"
upload:
	@echo "Uploading to S3 Bucket"
	${S3} sync public ${BUCKET}
	@echo "Done"

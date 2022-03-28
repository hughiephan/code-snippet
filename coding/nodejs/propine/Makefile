DOWNLOAD_FOLDER=storage
FILE=transactions.csv.zip

pre-init:
	sudo apt install nodejs
	sudo apt install npm
	sudo apt-get install unzip

init:
	@echo "Download the transactions & extract to ${DOWNLOAD_FOLDER}"
	sudo wget -nc https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip -O ./${DOWNLOAD_FOLDER}/${FILE} || true
	unzip -o ./${DOWNLOAD_FOLDER}/${FILE} -d ./${DOWNLOAD_FOLDER}
	@echo "Init the Propine project"
	npm install
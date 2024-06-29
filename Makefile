# Variables
APP_FILE = app.rb
PORT = 4567
RSPEC = bundle exec rspec
DATABASE_URL="postgresql://osvaloismtz:JX58MQsTLVSD@ep-proud-recipe-87355146.us-east-2.aws.neon.tech/fintech?sslmode=require&options=endpoint%3Dep-proud-recipe-87355146"


# Targets
all: run

install:
	bundle install --path vendor/bundle

run: install
	DATABASE_URL=$(DATABASE_URL) bundle exec ruby $(APP_FILE) -o 0.0.0.0 -p $(PORT)

test: install
	$(RSPEC) --format documentation

clean:
	# Aquí podrías agregar comandos para limpiar archivos generados
	echo "Nothing to clean"

.PHONY: all install run test clean

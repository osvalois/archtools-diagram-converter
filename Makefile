# Variables
APP_FILE = app.rb
PORT = 4567
RSPEC = bundle exec rspec

# Targets
all: run

install:
	bundle install --path vendor/bundle

run: install
	bundle exec ruby $(APP_FILE) -o 0.0.0.0 -p $(PORT)

test: install
	$(RSPEC) --format documentation

clean:
	# Aquí podrías agregar comandos para limpiar archivos generados
	echo "Nothing to clean"

.PHONY: all install run test clean

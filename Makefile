# Variables
APP_FILE = app.rb
PORT = 4567

# Targets
all: run

install:
	bundle install --path vendor/bundle

run: install
	bundle exec ruby $(APP_FILE) -o 0.0.0.0 -p $(PORT)

test:
	# Aquí podrías agregar comandos para correr tests, si los tuvieras
	echo "No tests defined"

clean:
	# Aquí podrías agregar comandos para limpiar archivos generados
	echo "Nothing to clean"

.PHONY: all install run test clean

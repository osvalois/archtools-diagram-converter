# Utiliza una imagen base de Ruby
FROM ruby:2.7

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el Gemfile y Gemfile.lock al contenedor
COPY Gemfile Gemfile.lock ./

# Instala las dependencias de la aplicación
RUN apt-get update && apt-get install -y \
    graphviz \
 && rm -rf /var/lib/apt/lists/*

# Instala la versión de Bundler especificada en el Gemfile.lock
RUN gem install bundler:1.17.2

# Instala las gemas necesarias utilizando la versión de Bundler especificada
RUN bundle _1.17.2_ install

# Copia el resto de los archivos al contenedor
COPY . .

# Expone el puerto que usará Sinatra
EXPOSE 4567

# Comando para ejecutar la aplicación
CMD ["bundle", "exec", "ruby", "app.rb"]

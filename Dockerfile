# Define la versión de Ruby
ARG RUBY_VERSION=2.6.10
FROM ruby:$RUBY_VERSION-slim as base

# Directorio de trabajo para la aplicación
WORKDIR /app

# Actualiza las gemas y bundler
RUN gem update --system --no-document && \
    gem install -N bundler

# Copia el archivo Gemfile y Gemfile.lock
COPY Gemfile* ./

# Instala las gemas de la aplicación
RUN bundle install --jobs $(nproc) --retry 3

# Etapa final para la imagen de la aplicación
FROM base

# Crea y utiliza un usuario no root para los archivos de la aplicación por razones de seguridad
RUN useradd -m -u 1000 ruby
USER ruby

# Copia los artefactos construidos: gemas y aplicación
COPY --from=base --chown=ruby:ruby /usr/local/bundle /usr/local/bundle
COPY --from=base --chown=ruby:ruby /app /app

# Copia el código de la aplicación
COPY --chown=ruby:ruby . .

# Expone el puerto utilizado por la aplicación
EXPOSE 4567

# Comando para iniciar el servidor
CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "--port", "4567"]

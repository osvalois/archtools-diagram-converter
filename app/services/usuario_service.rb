
class UsuariosService
  def initialize(usuario_repository)
    @usuario_repository = usuario_repository
    @wordlist_url = 'https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/spanish.txt'
    @wordlist = fetch_wordlist(@wordlist_url)
  end

  def registrar_usuario(nombre_usuario, passphrase)
    recovery_key_salt = BCrypt::Engine.generate_salt
    recovery_key_hash = hash_with_salt(passphrase, recovery_key_salt)
    @usuario_repository.guardar_usuario(nombre_usuario, recovery_key_hash, recovery_key_salt)
  end

  def obtener_usuario_por_id(usuario_id)
    @usuario_repository.obtener_usuario_por_id(usuario_id)
  end

  def obtener_usuario_por_nombre(nombre_usuario)
    @usuario_repository.obtener_usuario_por_nombre(nombre_usuario)
  end

  def generar_passphrase(num_words = 12)
    words = @wordlist.sample(num_words)
    passphrase = words.join(' ')
    passphrase
  end

  def autenticar_usuario(nombre_usuario, recovery_key)
    usuario = @usuario_repository.obtener_usuario_por_nombre(nombre_usuario)
    return false unless usuario

    stored_hash, salt = usuario.recovery_key.split('$')

    calculated_hash = hash_with_salt(recovery_key, salt)

    stored_hash == calculated_hash
  end

  def recuperar_passphrase(nombre_usuario, recovery_key)
    usuario = @usuario_repository.obtener_usuario_por_nombre(nombre_usuario)
    return nil unless usuario

    autenticado = autenticar_usuario(nombre_usuario, recovery_key)
    return nil unless autenticado

    usuario.passphrase
  end

  private

  def fetch_wordlist(url)
    words = []
    open(url) do |file|
      file.each_line do |line|
        words << line.strip
      end
    end
    words
  rescue StandardError => e
    puts "Error fetching wordlist: #{e.message}"
    []
  end

  def hash_with_salt(data, salt)
    bcrypt_salt = BCrypt::Engine.hash_secret(data, salt)
    "#{bcrypt_salt}$#{salt}"
  end
end

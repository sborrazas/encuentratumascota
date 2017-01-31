require "armor"

module Utils
  module Password

    def self.generate_digested_password(password)
      salt = Armor.hex(OpenSSL::Random.random_bytes(32))

      digest(password, salt) + salt
    end

    def self.password_matches?(password, encrypted)
      sha512, salt = encrypted.to_s[0...128], encrypted.to_s[128..-1]

      Armor.compare(digest(password, salt), sha512)
    end

    private

    def self.digest(password, salt)
      Armor.digest(password, salt)
    end

  end
end

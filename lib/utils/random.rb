require "securerandom"

module Utils
  module Random

    def self.hex(length)
      salt = SecureRandom.hex((length / 2.0).ceil)[0, length]
    end

  end
end

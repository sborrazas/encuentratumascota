module Utils
  module Hash

    def self.slice(hash, *keys)
      hash.select { |key, _| keys.include?(key) }
    end

    def self.omit(hash, *keys)
      hash.reject { |key, _| keys.include?(key) }
    end

  end
end

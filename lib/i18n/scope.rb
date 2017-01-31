module I18n
  class Scope

    # Initialize the I18n::Scope.
    #
    # @param translations [Hash]
    #   A Hash storing all the avilable translations.
    # @param keys [Array<String>]
    def initialize(translations, keys = [])
      @keys = keys
      @translations = translations
    end

    # Get the translated result.
    #
    # @param locals [Hash] ({})
    #
    # @return [String]
    def result(locals = {})
      res = pluralized_keys(locals).inject(@translations) do |trans, key|
        unless valid_key?(trans, key)
          raise "Translation `#{@keys.join(".")}` not found"
        end

        trans[key]
      end

      res.gsub(/%\{([^{}]+)\}/) { |match| locals.fetch($1.to_sym) }
    end

    # Create a new scope with the given key.
    #
    # @param key [String]
    #
    # @return [I18n::Scope]
    def [](key)
      Scope.new(@translations, @keys + [key])
    end

    private

    # Return the scope keys taking pluralization into account.
    #
    # @option locals [Fixnum] :count
    #   If this option is given, a pluralization key will be appended to the
    #   current scope keys.
    #
    # @return [Array<String>]
    def pluralized_keys(locals)
      if locals.has_key?(:count)
        @keys + [locals[:count] == 1 ? "one" : "other"]
      else
        @keys
      end
    end

    # Determine if the given key is a valid one given the current translations
    # scope.
    #
    # @param translations [Object]
    # @param key [String, Fixnum]
    #
    # @return [Boolean]
    def valid_key?(translations, key)
      case translations
      when Hash then translations.has_key?(key)
      when Array then key.kind_of?(Fixnum) && key < translations.size
      else false
      end
    end

  end
end

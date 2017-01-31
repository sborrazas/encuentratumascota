require "lib/i18n/client"

module Contexts
  module Extensions
    module I18n

      DEFAULT_LOCALE = "es"

      # Get the I18n::Client using the current locale.
      #
      # @return [I18n::Client]
      def i18n
        @i18n ||= ::I18n::Client.new(DEFAULT_LOCALE, {
          :locales_dir => File.join(APP_DIR, "config", "locales")
        })
      end

      # Translate the given key to the client.
      #
      # @param key [String]
      # @param locals [Hash] ({})
      #   A hash of locals to interpolate on the locale String.
      #
      # @return [String]
      def translate(key, locals = {})
        i18n.translate(key, locals)
      end
      alias_method :t, :translate

      # Get all the translations from the current locale.
      #
      # @return [Hash]
      def locale_translations
        i18n.locale_translations
      end

      # Transform the string from using the underscore notation to using spaces
      # and an uppercase letter on each word.
      #
      # @param text [String]
      #
      # @return [String]
      def titlecase(text)
        text = text.to_s.dup
        text.gsub!("_", " ")
        text.gsub!(/\b(\w)/, &:upcase)
        text
      end

    end
  end
end

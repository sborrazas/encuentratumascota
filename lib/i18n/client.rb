require "yaml"
require "lib/i18n/scope"
require "lib/i18n/client/datetime"

module I18n
  class Client

    include I18n::Client::Datetime

    attr_reader :locale

    # Initialize the I18n::Client.
    #
    # @param locale [String]
    # @option options [String, nil] (nil)
    #   The directory where the locale files can be found.
    def initialize(locale, options = {})
      @locale = locale
      @locales_dir = options.fetch(:locales_dir, nil)
    end

    # Translate the specified key.
    #
    # @param key [String]
    #   The key separating namespaces with a ".".
    # @param locals [Hash] ({})
    #   The locals to interpolate on the translation result.
    # @param scope [I18n::Scope] (locale_scope)
    #   The scope for which to begin searching for the translation.
    #
    # @return [String]
    def translate(key, locals = {}, scope = locale_scope)
      key.split(".").inject(scope) { |s, key| s[key] }.result(locals)
    end

    # Get the all locale translations structure.
    #
    # @return [Hash]
    def locale_translations
      @locale_scope ||= begin
        locale_path = "#{@locale}.yml"
        locale_path = File.join(@locales_dir, locale_path) if @locales_dir
        YAML.load_file(locale_path).fetch(@locale)
      end
    end

    private

    # The root scope of the client locale, found on the locale file.
    #
    # @return [I18n::Scope]
    def locale_scope
      I18n::Scope.new(locale_translations)
    end

  end
end

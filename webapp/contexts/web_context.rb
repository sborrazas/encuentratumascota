require "webapp/contexts/extensions/text"
require "webapp/contexts/extensions/i18n"

module Contexts
  class WebContext

    attr_reader :authenticity_token
    attr_reader :environment

    # TODO: Remove
    include Contexts::Extensions::Text
    include Contexts::Extensions::I18n

    def initialize(options = {})
      @authenticity_token = options.fetch(:authenticity_token)
      @environment = options.fetch(:environment)
    end

    def development?
      environment == "development"
    end

    def json(object)
      JSON.generate(object)
    end

    def iterate_collection(collection, &block)
      collection.fetch("items").each(&block)
    end

    def collection_empty?(collection)
      collection.fetch("items").empty?
    end

  end
end

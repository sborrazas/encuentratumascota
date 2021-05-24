require "sequel"
require "lib/encuentratumascota/client/breeds"
require "lib/encuentratumascota/client/countries"
require "lib/encuentratumascota/client/inquiries"
require "lib/encuentratumascota/client/publications"
require "lib/encuentratumascota/client/users"

module Encuentratumascota
  class Client

    attr_reader :db

    include Encuentratumascota::Client::Breeds
    include Encuentratumascota::Client::Countries
    include Encuentratumascota::Client::Inquiries
    include Encuentratumascota::Client::Publications
    include Encuentratumascota::Client::Users

    def self.connections
      (@connections ||= {})
    end

    def self.disconnect_all
      connections.each { |_, db| db.disconnect }
      connections.clear
    end

    def initialize(settings)
      host = settings.fetch(:host)
      user = settings.fetch(:user)
      database = settings.fetch(:name)

      connection_id = "#{user}@#{host}/#{database}"

      unless self.class.connections.has_key?(connection_id)
        self.class.connections[connection_id] = Sequel.postgres({
          :host => host,
          :database => database,
          :user => user,
          :password => settings.fetch(:password)
        })
      end

      @db = self.class.connections[connection_id]
    end

    private

    def collection(dataset, page, per_page, &block)
      total_pages = (dataset.count / per_page.to_f).ceil
      items = if page <= total_pages
        dataset.limit(per_page, (page - 1) * per_page).all
      else
        []
      end

      items = block.call(items) if block

      {
        "items" => items,
        "page" => page,
        "per_page" => per_page,
        "total_pages" => total_pages
      }
    end

  end
end

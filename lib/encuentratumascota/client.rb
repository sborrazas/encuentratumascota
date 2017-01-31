require "lib/encuentratumascota/client/breeds"
require "lib/encuentratumascota/client/inquiries"
require "lib/encuentratumascota/client/publications"
require "lib/encuentratumascota/client/users"

module Encuentratumascota
  class Client

    attr_reader :user_id
    attr_reader :db

    include Encuentratumascota::Client::Breeds
    include Encuentratumascota::Client::Inquiries
    include Encuentratumascota::Client::Publications
    include Encuentratumascota::Client::Users

    def initialize(_db, _user_id)
      @db = _db
      @user_id = _user_id
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

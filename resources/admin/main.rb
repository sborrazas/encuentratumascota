require "resources/base"
require "resources/admin/publications"
require "resources/admin/users"

module Encuentratumascota
  module Resources
    module Admin
      class Main < Resources::Admin::Publications

        def [](key)
          case key
          when "publications" then
            Resources::Admin::Publications.new(settings, request)
          when "users" then
            Resources::Admin::Users.new(settings, request)
          else
            super(key)
          end
        end

      end
    end
  end
end

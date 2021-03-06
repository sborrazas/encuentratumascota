require "resources/admin/main"
require "resources/auth"
require "resources/breeds"
require "resources/publications"

module Encuentratumascota
  module Resources
    class Root < Resources::Publications

      def [](key)
        case key
        when "p" then Resources::Publications.new(settings, request)
        when "breeds" then Resources::Breeds.new(settings, request)
        when "auth" then Resources::Auth.new(settings, request)
        when "admin" then Resources::Admin::Main.new(settings, request)
        else
          super(key)
        end
      end

    end
  end
end

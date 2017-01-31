require "resources/base"
require "resources/extensions/collection"

module Encuentratumascota
  module Resources
    class Breeds < Resources::Base

      include Resources::Extensions::Collection

      def acl
        [
          [ACL::EVERYONE, "list"],
        ]
      end

      def list(attrs)
        paginate(attrs) do |page, per_page|
          client.breeds(page, per_page)
        end
      end

    end
  end
end

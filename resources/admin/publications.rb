require "resources/base"
require "resources/extensions/collection"
require "resources/admin/publication"

module Encuentratumascota
  module Resources
    module Admin
      class Publications < Resources::Base

        include Resources::Extensions::Collection

        def acl
          [
            [ACL::AUTHENTICATED, "list"],
          ]
        end

        def [](key)
          publication = client.user_publication(current_user.fetch(:id), key)

          super(key) unless publication

          Resources::Admin::Publication.new(
            publication,
            settings,
            request
          )
        end

        def list(params)
          collection = paginate(params) do |page, per_page|
            client.user_publications(current_user.fetch(:id), page, per_page)
          end

          collection["items"].each do |publication|
            publication[:attachments].map! do |attachment|
              s3_client.public_url(attachment)
            end
          end

          collection
        end

      end
    end
  end
end

require "resources/base"

module Encuentratumascota
  module Resources
    class Publication < Resources::Base

      def initialize(publication, settings, request)
        super(settings, request)

        @publication = publication
      end

      def acl
        [
          [ACL::EVERYONE, "view"],
          [ACL::AUTHENTICATED, "inquiry"],
        ]
      end

      def detail
        @publication.tap do |publication|
          publication.delete(:contact)
          publication[:attachments].map! do |attachment|
            s3_client.public_url(attachment)
          end
        end
      end

      def inquiry(params)
        client.create_inquiry({
          :created_at => Time.now.utc,
          :publication_id => @publication.fetch(:id),
          :user_id => current_user.fetch(:id),
        })

        {
          "contact" => @publication.fetch(:contact),
        }
      end

    end
  end
end

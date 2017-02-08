require "resources/base"
require "resources/publication"
require "resources/extensions/collection"
require "lib/utils/slug_generator"
require "lib/utils/random"

module Encuentratumascota
  module Resources
    class Publications < Resources::Base

      include Resources::Extensions::Collection

      PUBLICATION_TYPES = ["adoption", "lost", "found"]
      SEXES = ["male", "female", "unknown"]
      STATUSES = ["active", "approved", "closed"]
      DEFAULT_STATUS = STATUSES.first
      MAX_ATTACHMENTS = 5

      ATTACHMENTS_DIRECTORY = "attachments"
      ATTACHMENTS_NAME_LENGTH = 32

      def acl
        [
          [ACL::EVERYONE, "list"],
          [ACL::AUTHENTICATED, "create"],
        ]
      end

      def [](key)
        super(key) if key == "new"

        publication = client.active_publication(country_code, key)

        super(key) unless publication

        Resources::Publication.new(publication, settings, request) # TODO: remove explicit passing
      end

      def list(params)
        collection = paginate(params) do |page, per_page|
          client.active_country_publications(country_code, page, per_page, {
            :type => params["type"], # TODO: validate inclusion or nil if none
          })
        end

        collection["items"].each do |publication|
          publication.delete(:contact)
          publication[:attachments].map! do |attachment|
            s3_client.public_url(attachment)
          end
        end

        collection
      end

      def create(params)
        attrs = coerce_params(params) do |coercer|
          coercer.coerce_attr(:pet_name, :string)
          coercer.coerce_attr(:type, :string)
          coercer.coerce_attr(:attachments, :array, {
            :element_type => :file,
          })
          coercer.coerce_attr(:sex, :string)
          coercer.coerce_attr(:breed_id, :integer)
          coercer.coerce_attr(:description, :string, :default => "")
          coercer.coerce_attr(:lost_on, :date)
          coercer.coerce_attr(:reward, :string, :default => "")
          coercer.coerce_attr(:contact, :string)
          coercer.coerce_attr(:lat, :float)
          coercer.coerce_attr(:lng, :float)
        end

        validate_block(attrs) do |validator|
          validator.validate_attr(:pet_name, :presence)
          validator.validate_attr(:type, :presence)
          validator.validate_attr(:type, :inclusion, {
            :items => PUBLICATION_TYPES,
          })
          validator.validate_attr(:attachments, :presence)
          validator.validate_attr(:attachments, :length, {
            :max => MAX_ATTACHMENTS,
            :min => 1,
          })
          # TODO: validate attachments size and type
          validator.validate_attr(:sex, :presence)
          validator.validate_attr(:sex, :inclusion, {
            :items => SEXES,
          })
          validator.validate_attr(:breed_id, :presence)
          validator.validate_attr(:description, :presence)
          validator.validate_attr(:contact, :presence)
          validator.validate_attr(:lat, :presence)
          validator.validate_attr(:lng, :presence)
          validator.validate_attr(:lost_on, :presence)
        end
        validate_block(attrs) do |validator|
          validator.validate_attr(:breed_id, :existence) do |breed_id|
            client.breed_exists?(breed_id)
          end
        end

        pet_name = attrs.fetch(:pet_name)
        attachments = attrs.fetch(:attachments)

        slug = Utils::SlugGenerator.generate_slug(pet_name) do |slug|
          client.slug_exists?(slug)
        end
        random_name = Utils::Random.hex(ATTACHMENTS_NAME_LENGTH)
        attachments_names = attachments.each_with_index.map do |attachment, i|
          extname = File.extname(attachment.fetch(:filename))
          name = File.join(
            ATTACHMENTS_DIRECTORY,
            "#{random_name}-#{i + 1}#{extname}"
          )

          s3_client.upload(attachment.fetch(:file), name)

          name
        end

        create_attrs = attrs.merge({
          :attachments => attachments_names,
          :status => DEFAULT_STATUS,
          :created_at => Time.now.utc,
          :country_code => country_code,
          :user_id => current_user.fetch(:id),
          :slug => slug,
        })

        id = client.create_publication(create_attrs)

        publication = Resources::Publication.new(
          client.active_publication(country_code, slug),
          settings, # TODO: remove explicit session/request passing
          request
        )

        publication.detail
      end

    end
  end
end

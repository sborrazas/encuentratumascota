require "resources/base"
require "resources/publications"
require "resources/publication"

module Encuentratumascota
  module Resources
    module Admin
      class Publication < Resources::Publication

        MAX_BREEDS = 100

        def acl
          [
            [ACL::AUTHENTICATED, "update"],
          ]
        end

        def detail
          @publication.tap do |publication|
            publication[:attachments].map! do |attachment|
              s3_client.public_url(attachment)
            end
          end
        end

        def update(params)
          attrs = coerce_params(params) do |coercer|
            coercer.coerce_attr(:pet_name, :string)
            coercer.coerce_attr(:type, :string)
            coercer.coerce_attr(:attachments, :hash, {
              :key_type => :integer,
              :value_type => :file,
            })
            coercer.coerce_attr(:sex, :string)
            coercer.coerce_attr(:breed_id, :integer)
            coercer.coerce_attr(:description, :string, :default => "")
            coercer.coerce_attr(:lost_on, :date, :format => "%d/%m/%Y")
            coercer.coerce_attr(:reward, :string, :default => "")
            coercer.coerce_attr(:contact, :string)
            coercer.coerce_attr(:lat, :float)
            coercer.coerce_attr(:lng, :float)
          end

          validate_block(attrs) do |validator|
            validator.validate_attr(:pet_name, :presence)
            validator.validate_attr(:type, :presence)
            validator.validate_attr(:type, :inclusion, {
              :items => Resources::Publications::PUBLICATION_TYPES,
            })
            validator.validate_attr(:attachments, :length, {
              :max => Resources::Publications::MAX_ATTACHMENTS,
            })
            # TODO: validate attachments size and type
            validator.validate_attr(:sex, :presence)
            validator.validate_attr(:sex, :inclusion, {
              :items => Resources::Publications::SEXES,
            })
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
          current_attachments = @publication.fetch(:attachments)

          slug = if pet_name != @publication.fetch(:pet_name)
            Utils::SlugGenerator.generate_slug(pet_name) do |slug|
              client.slug_exists?(slug)
            end
          else
            @publication.fetch(:slug)
          end
          random_name = Utils::Random.hex(
            Resources::Publications::ATTACHMENTS_NAME_LENGTH
          )
          attachments_names = []
          attachments.each do |index, attachment|
            if attachment && !current_attachments[index]
              extname = File.extname(attachment.fetch(:filename))
              name = File.join(
                Resources::Publications::ATTACHMENTS_DIRECTORY,
                "#{random_name}-#{index + 1}#{extname}"
              )

              s3_client.upload(attachment.fetch(:file), name)

              attachments_names << name
            end
          end

          update_attrs = attrs.merge({
            :attachments => attachments_names,
            :slug => slug,
          })

          client.update_publication(@publication.fetch(:id), update_attrs)

          @publication.merge!(update_attrs)

          detail
        end

        def breeds_options
          client.breeds(1, MAX_BREEDS).fetch("items").map do |breed|
            [breed.fetch(:id), breed.fetch(:name)]
          end
        end

      end
    end
  end
end

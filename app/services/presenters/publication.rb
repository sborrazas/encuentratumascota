module Presenters
  module Publication

    extend ActionView::Helpers::TextHelper

    module_function

    def self.to_json_hash(publication, options = {})
      attributes = {
        id: publication.id,
        slug: publication.slug,
        publication_type: publication.publication_type,
        pet_name: publication.pet_name,
        attachments: publication.attachments.map {|a| a.image.url },
        description: publication.description,
        short_description: truncate(publication.description, length: 100, separator: ' '),
        breed: publication.breed ? publication.breed.name : I18n.t('models.publication.blank_breed_text'),
        lost_on: publication.lost_on.strftime('%d/%m/%Y'),
        sex: I18n.t("models.publication.sexes.#{publication.sex}"),
        lat: publication.lat,
        lng: publication.lng
      }

      if options.has_key?(:extra_attributes)
        options.fetch(:extra_attributes).each do |attr|
          attributes[attr.to_sym] = publication[attr.to_sym]
        end
      end

      attributes
    end
  end
end

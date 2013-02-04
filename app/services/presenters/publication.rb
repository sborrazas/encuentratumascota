module Presenters
  module Publication

    module_function

    def self.to_json_hash(publication, options = {})
      attributes = {
        id: publication.id.to_s,
        publication_type: publication.publication_type,
        pet_name: publication.pet_name,
        attachments: publication.attachments.map {|a| a.image.url },
        description: publication.description,
        breed: publication.breed.name,
        lost_on: publication.lost_on.strftime('%d/%m/%Y'),
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

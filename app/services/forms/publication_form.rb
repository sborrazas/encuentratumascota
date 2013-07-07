module Forms
  class PublicationForm < Forms::Base
    def process_errors(params, options)
      errors = default_errors_hash
      context = options.fetch(:context, :default)
      resource = options.fetch(:resource, nil)

      errors[:pet_name] << :blank_pet_name if is_empty_string?(params[:pet_name])
      if is_empty_string?(params[:lat]) || is_empty_string?(params[:lng])
        errors[:lat] << :blank_coords
        errors[:lng] << :blank_coords
      end
      unless Publication::PUBLICATION_TYPES.include?(params[:publication_type])
        errors[:publication_type] << :invalid_publication_type
      end
      errors[:contact] << :blank_contact if is_empty_string?(params[:contact])
      errors[:sex] << :invalid_sex unless Publication::SEXES.include?(params[:sex])
      if valid_attachments(params[:attachments]).empty? && (!resource || resource.attachments.empty?)
        errors[:attachments] << :minimum_attachments
      end
      unless params[:lost_on] && (Date.strptime(params[:lost_on], '%d/%m/%Y') rescue false)
        errors[:lost_on] << :invalid_lost_on
      end
      if !is_empty_string?(params[:breed_id].to_s) && !Breed.find_by_id(params[:breed_id])
        errors[:breed_id] << :missing_breed_id
      end
      if is_empty_string?(params[:country_id].to_s) || !Country.find_by_id(params[:country_id])
        errors[:country_id] << :missing_country_id
      end

      if context == :admin
        errors[:user_id] << :blank_user_id if is_empty_string?(params[:user_id])
        errors[:status] << :invalid_status unless Publication::STATUSES.include?(params[:status])
      end

      errors
    end

    def build_resource(params, options)
      context = options.fetch(:context, :default)
      publication = options.fetch(:resource) { Publication.new }

      valid_keys = if context == :admin
        param_keys + [:status, :user_id]
      else
        param_keys
      end

      valid_params = params.slice(*valid_keys)

      valid_params[:lost_on] = Date.strptime(params[:lost_on], '%d/%m/%Y')
      valid_params[:breed_id] = params[:breed_id] if !is_empty_string?(params[:breed_id]) && Breed.find_by_id(params[:breed_id])

      if (attachments = valid_attachments(params[:attachments])).any?
        valid_params[:attachments] = attachments.concat(publication.attachments.last(Publication::MAX_ATTACHMENTS - attachments.count))
      end

      publication.assign_attributes(valid_params)

      publication
    end

    private

    def valid_attachments(attachment_params)
      attachments = []
      if attachment_params.kind_of?(Hash)
        # attachment_params is a Hash in the form of { "0" => file1, "1" => file2 }
        attachments_params = attachment_params.values.reject(&:blank?).select {|a| a.kind_of?(ActionDispatch::Http::UploadedFile) }
        attachments_params = attachments_params.first(Publication::MAX_ATTACHMENTS)

        attachments = attachments_params.map do |image|
          Attachment.new(image: image)
        end
      end
      attachments
    end

    def param_keys
      [
        :pet_name,
        :sex,
        :contact,
        :description,
        :lat,
        :lng,
        :reward,
        :publication_type,
        :country_id
      ]
    end

    def is_empty_string?(str)
      !str || !str.kind_of?(String) || str.strip.empty?
    end
  end
end

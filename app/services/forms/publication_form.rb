module Forms
  class PublicationForm < Forms::Base
    def process_errors(params, options)
      errors = default_errors_hash
      context = options.fetch(:context, :default)
      resource = options.fetch(:resource, nil)

      translations = I18n.t('models.publication.errors')

      errors[:pet_name] << translations[:blank_pet_name] if is_empty_string?(params[:pet_name])
      if is_empty_string?(params[:lat]) || is_empty_string?(params[:lng])
        errors[:lat] << translations[:blank_coords]
        errors[:lng] << translations[:blank_coords]
      end
      unless Publication::PUBLICATION_TYPES.include?(params[:publication_type])
        errors[:publication_type] << translations[:invalid_publication_type]
      end
      errors[:breed_id] << translations[:missing_breed_id] unless Breed.find_by_id(params[:breed_id])
      errors[:contact] << translations[:blank_contact] if is_empty_string?(params[:contact])
      errors[:sex] << translations[:invalid_sex] unless Publication::SEXES.include?(params[:sex])
      unless params[:lost_on] && (Date.strptime(params[:lost_on], '%d/%m/%Y') rescue false)
        errors[:lost_on] << translations[:invalid_lost_on]
      end

      if context == :admin
        errors[:user_id] << translations[:blank_user_id] if is_empty_string?(params[:user_id])
        errors[:status] << translations[:invalid_status] unless Publication::STATUSES.include?(params[:status])
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

      if params[:attachments].kind_of?(Hash)
        # params[:attachments] is a Hash of the form { "0" => file1, "1" => file2 }
        attachments_params = params[:attachments].values.reject(:blank?)[0..3]
        valid_params[:attachments] = attachments_params.map do |image|
          Attachment.new(image: image)
        end
      end

      publication.assign_attributes(valid_params)

      publication
    end

    private

    def param_keys
      [:pet_name, :sex, :contact, :description, :lat, :lng, :reward, :publication_type, :breed_id, :user_id]
    end

    def is_empty_string?(str)
      !str || !str.kind_of?(String) || str.chomp.empty?
    end
  end
end

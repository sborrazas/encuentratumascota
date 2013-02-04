module Forms
  class PublicationForm < Forms::Base
    def process_errors(params, options)
      errors = default_errors_hash
      context = options.fetch(:context, :default)

      # [:pet_name, :age, :description, :phone, :lat, :lng, :reward, :publication_type, :breed_id]
      errors[:pet_name] << 'is invalid' if is_empty_string?(params[:pet_name])
      errors[:lat] << 'is invalid' if is_empty_string?(params[:lat])
      errors[:lng] << 'is invalid' if is_empty_string?(params[:lng])
      errors[:publication_type] << 'is invalid' unless Publication::PUBLICATION_TYPES.include?(params[:publication_type])
      errors[:breed_id] << 'does not exist' unless Breed.find_by_id(params[:breed_id])
      errors[:contact] << 'can\'t be blank' if is_empty_string?(params[:contact])
      unless params[:lost_on] && (Date.strptime(params[:lost_on], '%d/%m/%Y') rescue false)
        errors[:lost_on] << 'can\'t be blank'
      end

      if context == :admin
        errors[:user_id] << 'is invalid' if is_empty_string?(params[:user_id])
        errors[:status] << 'is invalid' unless Publication::STATUSES.include?(params[:status])
      end

      errors
    end

    def build_resource(params, options)
      context = options.fetch(:context, :default)

      valid_keys = if context == :admin
        param_keys + [:status, :user_id]
      else
        param_keys
      end

      valid_params = params.slice(*valid_keys)

      valid_params[:lost_on] = Date.strptime(params[:lost_on], '%d/%m/%Y')

      if params[:attachments].kind_of?(Hash)
        # params[:attachments] is a Hash of the form { "0" => file1, "1" => file2 }
        valid_params[:attachments] = params[:attachments].values.map do |image|
          Attachment.new(image: image)
        end
      end

      Publication.new(valid_params)
    end

    private

    def param_keys
      [:pet_name, :contact, :description, :lat, :lng, :reward, :publication_type, :breed_id]
    end

    def is_empty_string?(str)
      !str || !str.kind_of?(String) || str.chomp.empty?
    end
  end
end

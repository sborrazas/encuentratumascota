module Forms
  class PublicationForm < Forms::Base
    def process_errors(params)
      errors = default_errors_hash

      # [:pet_name, :age, :description, :phone, :lat, :lng, :reward, :publication_type, :breed_id]
      errors[:pet_name] << 'is invalid' if is_empty_string?(params[:pet_name])
      errors[:lat] << 'is invalid' if is_empty_string?(params[:lat])
      errors[:lng] << 'is invalid' if is_empty_string?(params[:lng])
      errors[:publication_type] << 'is invalid' unless Publication::STATUS.include?(params[:publication_type])
      errors[:breed_id] << 'does not exist' unless Breed.find_by_id(params[:breed_id])
      errors[:lost_on] << 'can\'t be blank' unless params[:lost_on] && (Date.parse(params[:lost_on]) rescue false)

      errors
    end

    def is_empty_string?(str)
      !str || !str.kind_of?(String) || str.chomp.empty?
    end
  end
end

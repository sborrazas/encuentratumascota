class PublicationsController < ApplicationController

  respond_to :json

  def create
    publication_validator = Forms::PublicationForm.new(publication_params)

    if publication_validator.valid?
      @publication = Publication.create(publication_params.merge(user: current_user))

      render json: @publication.attributes.slice(*publication_attribute_keys), status: :created
    else
      render json: { errors: publication_validator.errors }, status: :unprocessable_entity
    end
  end

  private

  def publication_params
    params[:publication].slice(*publication_attribute_keys)
  end

  def publication_attribute_keys
    [:pet_name, :age, :description, :phone, :lat, :lng, :reward, :publication_type, :breed_id]
  end
end

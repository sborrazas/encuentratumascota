class PublicationsController < ApplicationController

  before_filter :require_current_user
  respond_to :json

  def create
    publication_form = Forms::PublicationForm.new(params[:publication])

    if publication_form.valid?
      publication = publication_form.get_resource
      publication.assign_attributes(user: current_user, status: 'active')
      publication.save

      render json: publication.attributes.slice(*publication_attribute_keys), status: :created
    else
      render json: { errors: publication_form.errors }, status: :unprocessable_entity
    end
  end

  private

  def publication_attribute_keys
    [:pet_name, :contact, :lost_on, :description, :phone, :lat, :lng, :reward, :publication_type, :breed_id]
  end
end

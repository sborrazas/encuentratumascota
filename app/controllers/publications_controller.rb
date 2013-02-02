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

  def show
    @publication = Publication.has_status(:active).includes(:breed, :attachments).find(params[:id])

    if @publication
      render json: @publication.attributes.slice(*private_publication_attribute_keys), status: :ok
    else
      render blank: true, status: :not_found
    end
  end

  private

  def publication_attribute_keys
    %w(pet_name lost_on description phone lat lng reward publication_type breed_id)
  end

  def private_publication_attribute_keys
    publication_attribute_keys + %w(contact)
  end
end

class PublicationsController < ApplicationController

  before_filter :require_current_user
  respond_to :json

  def create
    publication_form = Forms::PublicationForm.new(params[:publication])

    if publication_form.valid?
      publication = publication_form.get_resource
      publication.assign_attributes(user: current_user, status: 'active')
      publication.save

      render json: Presenters::Publication.to_json_hash(publication), status: :created
    else
      render json: { errors: publication_form.errors }, status: :unprocessable_entity
    end
  end

  def show
    publication = Publication.has_status(:active).includes(:breed, :attachments).find(params[:id])

    if publication
      current_user.create_inquiry(publication)
      publication_json = Presenters::Publication.to_json_hash(publication, { extra_attributes: %w(contact) })
      render json: publication_json, status: :ok
    else
      render blank: true, status: :not_found
    end
  end
end

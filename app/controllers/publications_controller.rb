class PublicationsController < ApplicationController

  before_filter :require_current_user, only: %w(create show)
  respond_to :json, only: %w(create show)
  respond_to :rss, only: %w(index)

  def index
    @publications = public_publications
    respond_to do |format|
      format.json do
        publications_json = @publications.map do |publication|
          Presenters::Publication.to_json_hash(publication)
        end
        render json: publications_json
      end
      format.rss { render layout: false }
    end
  end

  def create
    publication_form = Forms::PublicationForm.new(params[:publication].merge({
      country_id: current_country.id
    }))

    if publication_form.valid?
      publication = publication_form.get_resource
      publication.populate_slug
      publication.assign_attributes(user: current_user, status: 'active')
      publication.save

      publication_json = Presenters::Publication.to_json_hash(publication)

      render json: publication_json, status: :created
    else
      errors = publication_form.errors
      render json: { errors: errors }, status: :unprocessable_entity
    end
  end

  def show
    publication = public_publications.find(params[:id])

    if publication
      current_user.create_inquiry(publication)
      publication_json = Presenters::Publication.to_json_hash(publication, {
        extra_attributes: %w(contact)
      })
      render json: publication_json, status: :ok
    else
      render blank: true, status: :not_found
    end
  end

  def public_publications
    current_country.publications
      .has_status(:active, :approved)
      .includes(:breed, :attachments, :country)
  end

end

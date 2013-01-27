class Admin::PublicationsController < ApplicationController

  before_filter :require_current_user
  before_filter :require_admin, only: [:new, :create]

  def index
    @publications = Publication.all
  end

  def new
    @publication = Publication.new
  end

  def create
    @publication = Publication.new(publication_params)
    publication_validator = Forms::PublicationForm.new(publication_params, context: :admin)

    if publication_validator.valid?
      @publication.save
      redirect_to admin_publications_path, flash: { success: 'Publication created successfully' }
    else
      render :new
    end
  end

  def edit
    @publication = Publication.find(params[:id])
  end

  def update
    @publication = Publication.find(params[:id])
    publication_validator = Forms::PublicationForm.new(publication_params, {
      context: :admin,
      resource: @publication
    })

    if publication_validator.valid?
      @publication.update_attributes(publication_params)
      redirect_to admin_publications_path, flash: { success: 'Publication updated successfully' }
    else
      @publication.assign_attributes(publication_params)
      render :edit
    end
  end

  private

  def publication_params
    params[:publication].slice(*publication_attribute_keys)
  end

  def publication_attribute_keys
    %w(pet_name contact lost_on description phone reward publication_type breed_id status user_id).map(&:to_sym)
  end
end

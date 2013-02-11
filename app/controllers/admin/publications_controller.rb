class Admin::PublicationsController < ApplicationController

  before_filter :require_current_user
  before_filter :require_admin, only: [:new, :create]

  def index
    @publications = user_publications_scope.all
  end

  def show
    @publication = user_publications_scope.find(params[:id])
  end

  def new
    @publication = Publication.new
  end

  def create
    publication_form = Forms::PublicationForm.new(publication_params, context: :admin)
    @publication = publication_form.get_resource

    if publication_form.valid?
      @publication.save
      redirect_to admin_publications_path, flash: { success: 'Publication created successfully' }
    else
      @errors = publication_form.errors
      render :new
    end
  end

  def edit
    @publication = user_publications_scope.find(params[:id])
    return unauthorized_access unless @publication
  end

  def update
    @publication = user_publications_scope.find(params[:id])
    return unauthorized_access unless @publication

    publication_form = Forms::PublicationForm.new(publication_params, {
      context: :admin,
      resource: @publication
    })

    if publication_form.valid?
      publication_form.get_resource.save
      redirect_to admin_publications_path, flash: { success: 'Publication updated successfully' }
    else
      @publication.assign_attributes(publication_params)
      @errors = publication_form.errors
      render :edit
    end
  end

  private

  def publication_params
    params[:publication]
  end

  def user_publications_scope
    current_user.is_admin? ? Publication.scoped : current_user.publications
  end
end

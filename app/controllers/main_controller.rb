class MainController < ApplicationController

  EMAIL_REGEX = /\A[\w.%+-]+@[\w.-]+\.[a-z]+\z/i

  def index
    @new_publication = Publication.new
    publications_scope = Publication.has_status(:active, :approved)
      .includes(:breed, :attachments).sort_newest
    @publications = publications_scope.all

    @flash_messages = {}.tap do |h|
      [:success, :info, :error].map {|e| h[e] = flash[e] }
    end

    if !params[:slug].blank? && params[:slug] != 'new'
      @current_publication = publications_scope.find_by_slug(params[:slug])
    end

    @user = User.new
  end

  def how_it_works
    @newsletter_subscriber = NewsletterSubscriber.new
    render layout: false
  end
end

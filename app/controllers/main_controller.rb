class MainController < ApplicationController

  EMAIL_REGEX = /\A[\w.%+-]+@[\w.-]+\.[a-z]+\z/i

  def index
    @new_publication = Publication.new
    @publications = Publication.has_status(:active).includes(:breed, :attachments).all

    @flash_messages = {}.tap do |h|
      [:success, :info, :error].map {|e| h[e] = flash[e] }
    end

    @user = User.new
  end

  def landing
    @newsletter_subscriber = NewsletterSubscriber.new
    render layout: false
  end

  def submit_newsletter
    if EMAIL_REGEX =~ newsletter_params[:email].to_s
      NewsletterSubscriber.where(email: newsletter_params[:email]) || \
        NewsletterSubscriber.create(email: newsletter_params[:email])

      redirect_to root_url, flash: { success: t('main.submit_newsletter.success') }
    else
      redirect_to root_url, flash: { error: t('main.submit_newsletter.invalid_email') }
    end
  end

  def newsletter_params
    if params[:newsletter_subscriber].kind_of?(Hash)
      params[:newsletter_subscriber].slice(:email)
    else
      {}
    end
  end
end

class MainController < ApplicationController
  def index
    @new_publication = Publication.new
    @publications = Publication.has_status(:active).all

    @flash_messages = {}.tap do |h|
      [:success, :info, :error].map {|e| h[e] = flash[e] }
    end

    @user = User.new
  end
end

class MainController < ApplicationController
  def index
    @publications = Publication.all

    @flash_messages = {}.tap do |h|
      [:success, :info, :error].map {|e| h[e] = flash[e] }
    end

    @user = User.new
  end
end

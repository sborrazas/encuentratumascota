class MainController < ApplicationController
  def index
    @publications = Publication.all
  end
end

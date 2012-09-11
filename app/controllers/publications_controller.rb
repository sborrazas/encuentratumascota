class PublicationsController < ApplicationController
  
  def new
    @publication = Publication.new
  end
  
  def index
    render 'publications/map'
  end
  
end

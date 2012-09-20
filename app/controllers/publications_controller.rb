class PublicationsController < ApplicationController
  
  def new
    @publication = Publication.new
  end
  
  def index
    @publications = Publication.all
    puts @publications.to_json
  end
  
end

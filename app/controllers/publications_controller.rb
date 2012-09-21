class PublicationsController < ApplicationController

  def new
    @publication = Publication.new
  end
end

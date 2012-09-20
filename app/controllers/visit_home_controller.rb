class VisitHomeController < ApplicationController
  
  def add
    visit = VisitHome.new(:lat=>params[:lat],:lng=>params[:lng])
    visit.save
    render :json => visit
  end
  
  def view_visits
    visits = VisitHome.all
    render :json => visits    
  end
  
end

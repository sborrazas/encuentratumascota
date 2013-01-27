class User < ActiveRecord::Base

  include Shield::Model

  has_many :publications, dependent: :destroy

  def self.fetch(email)
    self.find_by_email(email) unless email.try(:empty?)
  end

  def display
    self.email.empty? ? self.provider_username : self.email
  end
end

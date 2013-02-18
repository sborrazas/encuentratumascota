class User < ActiveRecord::Base

  include Shield::Model

  has_many :publications, dependent: :destroy
  has_many :contact_info_inquiries, dependent: :destroy

  def self.fetch(email)
    self.find_by_email(email) unless email.try(:empty?)
  end

  def display
    self.email.blank? ? self.provider_username : self.email
  end

  def create_inquiry(publication)
    contact_info_inquiries.where(publication_id: publication.id).first || \
      contact_info_inquiries.create!(publication: publication)
  end
end

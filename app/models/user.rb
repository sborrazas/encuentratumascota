class User < ActiveRecord::Base

  include Shield::Model

  has_many :publications, dependent: :destroy
  has_many :contact_info_inquiries, dependent: :destroy

  def self.fetch(email_or_username)
    unless email_or_username.try(:empty?)
      user = where('users.email = ? OR users.private_username = ?', email_or_username, email_or_username).first
      return user unless user.crypted_password.empty?
    end
  end

  def display
    self.private_username.blank? ? self.provider_username : self.private_username
  end

  def create_inquiry(publication)
    contact_info_inquiries.where(publication_id: publication.id).first || \
      contact_info_inquiries.create!(publication: publication)
  end
end

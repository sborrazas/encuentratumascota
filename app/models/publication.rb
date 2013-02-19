class Publication < ActiveRecord::Base

  belongs_to :user
  belongs_to :breed
  has_many :attachments, dependent: :destroy
  has_many :contact_info_inquiries, dependent: :destroy

  PUBLICATION_TYPES = %w(adoption lost found)
  STATUSES = %w(active inactive closed)
  SEXES = %w(male female unknown)

  MAX_ATTACHMENTS = 4

  scope :has_publication_type, lambda {|*ptype| where(publication_type: ptype) }
  scope :has_status, lambda {|*statuses| where(status: statuses) }
  scope :sort_newest, order('publications.created_at DESC')

end

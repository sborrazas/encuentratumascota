class Publication < ActiveRecord::Base

  belongs_to :user
  belongs_to :breed
  belongs_to :country
  has_many :attachments, dependent: :destroy
  has_many :contact_info_inquiries, dependent: :destroy

  PUBLICATION_TYPES = %w(adoption lost found)
  STATUSES = %w(active approved closed)
  SEXES = %w(male female unknown)

  MAX_ATTACHMENTS = 4

  scope :has_publication_type, lambda {|*ptype| where(publication_type: ptype) }
  scope :has_status, lambda {|*statuses| where(status: statuses) }
  scope :sort_newest, order('publications.created_at DESC')

  def populate_slug
    self.slug = SlugGeneratorService.generate_slug(pet_name) do |the_slug|
      scope = self.class.where(slug: the_slug)
      scope = scope.where('publications.id != ?', self.id) if self.id
      scope.any?
    end
  end
end

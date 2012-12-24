class Attachment < ActiveRecord::Base

  belongs_to :publication

  mount_uploader :image, AttachmentUploader

end

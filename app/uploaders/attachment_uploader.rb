class AttachmentUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick

  storage :fog

  process resize_to_fit: [400, nil]

end

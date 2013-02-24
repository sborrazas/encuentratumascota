class AttachmentUploader < CarrierWave::Uploader::Base

  include CarrierWave::RMagick

  storage :fog

  process resize_to_fit: [400, nil]

  def store_dir
    "uploads/#{model.class.to_s.underscore.pluralize}"
  end

  def filename
    random_token = Digest::SHA2.hexdigest(Time.now.utc.to_s).first(20)
    "#{random_token}-#{original_filename}"
  end
end

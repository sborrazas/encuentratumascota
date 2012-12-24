# Carrierwave S3 configuration
CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Encuentratumascota::Config::S3_KEY,
    aws_secret_access_key: Encuentratumascota::Config::S3_SECRET
  }
  config.fog_directory = Encuentratumascota::Config::S3_BUCKET
end

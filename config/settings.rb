require 'rails/all'

module Encuentratumascota
  module Config
    filename = File.join(File.dirname(__FILE__), 'settings.json')
    config = if File.exists?(filename)
      config = ActiveSupport::JSON.decode(File.open(filename).read)
    else
      {}
    end

    S3_KEY = config['s3_key']
    S3_SECRET = config['s3_secret']
    S3_BUCKET = config['s3_bucket']

    FACEBOOK_KEY = config['facebook_key']
    FACEBOOK_SECRET = config['facebook_secret']

    TWITTER_KEY = config['twitter_key']
    TWITTER_SECRET = config['twitter_secret']

    MAIL_USERNAME = config['mail_username']
    MAIL_PASSWORD = config['mail_password']
    MAIL_HOST = config['mail_host']
    MAIL_DOMAIN = config['mail_domain']
    MAIL_PORT = config['mail_port']
  end
end

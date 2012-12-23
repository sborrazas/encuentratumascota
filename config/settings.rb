module Encuentratumascota
  module Config
    # Important, DO NOT use ||= on constants that can have false as value, use
    # something like:
    # DEBUG = false unless defined?(DEBUG) && DEBUG

    # S3
    S3_KEY ||= ENV['S3_KEY']
    S3_SECRET ||= ENV['S3_SECRET']
    S3_BUCKET ||= ENV['S3_BUCKET']

  end
end

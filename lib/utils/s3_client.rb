require "aws-sdk"

module Utils
  class S3Client

    def initialize(key, secret, region, bucket_name)
      @client = Aws::S3::Client.new({
        :access_key_id => key,
        :secret_access_key => secret,
        :region => region,
      })
      @bucket = Aws::S3::Bucket.new(bucket_name, :client => @client)
    end

    def upload(file, s3_path)
      @bucket.put_object({
        :acl => "public-read",
        :body => file,
        :key => s3_path,
      })
    end

    def public_url(path)
      @bucket.object(path).public_url
    end

  end
end

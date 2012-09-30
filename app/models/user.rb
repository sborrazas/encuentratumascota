class User < ActiveRecord::Base

  has_many :publications, dependent: :destroy

  devise :omniauthable, :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  class << self
    def find_or_create_for_oauth(auth, signed_in_resource = nil)
      user = User.where(provider: auth.provider, uid: auth.uid).first
      unless user
        user = User.create({
          name: auth.extra.raw_info.name,
          provider: auth.provider,
          uid: auth.uid,
          email: auth.info.email,
          password: Devise.friendly_token[0, 20]
        })
      end
      user
    end
  end

end

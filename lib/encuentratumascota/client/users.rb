module Encuentratumascota
  class Client
    module Users

      def user_by_email_or_username(email_or_username)
        db[:users]
          .where(:private_username => email_or_username)
          .or(:email => email_or_username)
          .first
      end

      def private_username_exists?(private_username)
        !db[:users].where(:private_username => private_username).empty?
      end

      def email_exists?(email)
        !db[:users].where(:email => email).empty?
      end

      def user_by_provider_and_uid(provider, uid)
        db[:users].where(:provider => provider, :uid => uid).first
      end

      def user_by_email(email)
        db[:users].where(:email => email).first
      end

      def create_user(attrs)
        db[:users].insert(attrs)
      end

      def update_user(id, attrs)
        db[:users].where(:id => id).update(attrs)
      end

      def user_by_id(id)
        db[:users].where(:id => id).first
      end

    end
  end
end

module Encuentratumascota
  class Client
    module Inquiries

      def create_inquiry(attrs)
        db[:contact_info_inquiries].insert(attrs)
      end

    end
  end
end

module Encuentratumascota
  class Client
    module Countries

      def country_exists_by_code?(code)
        !db[:countries].where(:code => code).empty?
      end

      def create_country(attrs)
        db[:countries].insert(attrs)
      end
    end
  end
end

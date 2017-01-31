module Encuentratumascota
  class Client
    module Breeds

      def breeds(page, per_page, filters = {})
        collection(db[:breeds], page, per_page)
      end

      def breed_exists?(id)
        !db[:breeds].where(:id => id).empty?
      end

    end
  end
end

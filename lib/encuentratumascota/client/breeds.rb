module Encuentratumascota
  class Client
    module Breeds

      def breeds(page, per_page, filters = {})
        collection(db[:breeds], page, per_page)
      end

      def breed_exists?(id)
        !db[:breeds].where(:id => id).empty?
      end

      def breed_exists_by_name?(name)
        !db[:breeds].where(:name => name).empty?
      end

      def create_breed(attrs)
        db[:breeds].insert(attrs)
      end
    end
  end
end

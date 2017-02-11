module Encuentratumascota
  class Client
    module Publications

      def active_country_publications(country_code, page, per_page, filters = {})
        dataset = db[:publications]
          .where({
            :status => ["active", "approved"],
            :country_code => country_code,
          })

        if filters[:type]
          dataset = dataset.where({
            :type => filters[:type],
          })
        end

        publications(dataset, page, per_page)
      end

      def user_publications(user_id, page, per_page, filters = {})
        dataset = db[:publications]
          .where({
            :user_id => user_id,
          })

        publications(dataset, page, per_page)
      end

      def active_publication(country_code, slug)
        dataset = db[:publications]
          .where({
            :country_code => country_code,
            :slug => slug,
            :status => ["active", "approved"],
          })

        publication(dataset)
      end

      def user_publication(user_id, id)
        dataset = db[:publications]
          .where({
            :publications__id => id,
            :user_id => user_id,
          })

        publication(dataset)
      end

      def create_publication(attrs)
        attachments = attrs.delete(:attachments)
        db.transaction do
          id = db[:publications].insert(attrs)

          attachments.map do |attachment_name|
            db[:attachments].insert({
              :image => attachment_name,
              :publication_id => id,
            })
          end

          id
        end
      end

      def update_publication(id, attrs)
        attachments = attrs.delete(:attachments)
        db.transaction do
          db[:publications].where(:id => id).update(attrs)

          attachments.map do |attachment_name|
            db[:attachments].insert({
              :image => attachment_name,
              :publication_id => id,
            })
          end
        end
      end

      def slug_exists?(slug)
        !db[:publications].where(:slug => slug).empty?
      end

      private

      def publications(dataset, page, per_page)
        dataset = dataset
          .left_join(:breeds, :publications__breed_id => :breeds__id)
          .select_all(:publications)
          .select_append(:breeds__name___breed)
          .order(:created_at)
          .reverse

        collection(dataset, page, per_page) do |items|
          ids = items.map { |i| i[:id] }
          attachments = Hash.new { |h, k| h[k] = [] }

          db[:attachments].where(:publication_id => ids).each do |attachment|
            attachments[attachment[:publication_id]] << attachment[:image]
          end

          items.each do |item|
            item[:attachments] = attachments[item[:id]]
          end
        end
      end

      def publication(dataset)
        _publication = dataset
          .join(:breeds, :publications__breed_id => :breeds__id)
          .select_all(:publications)
          .select_append(:breeds__name___breed)
          .first

        if _publication
          attachments = db[:attachments].where({
            :publication_id => _publication[:id]
          })

          _publication[:attachments] = attachments.map { |a| a[:image] }
        end

        _publication
      end

    end
  end
end

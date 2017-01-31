module Encuentratumascota
  class Client
    module Publications

      def active_publications(page, per_page, filters = {})
        country_code = filters.fetch(:country_code)

        dataset = db[:publications]
          .where({
            :status => ["active", "approved"],
            :country_code => country_code,
          })
          .join(:breeds, :publications__breed_id => :breeds__id)
          .select_all(:publications)
          .select_append(:breeds__name___breed)
          .order(:created_at)
          .reverse

        if filters[:country_code]
          dataset = dataset.where(:country_code => filters[:country_code])
        end
        if filters[:publication_type]
          dataset = dataset.where({
            :publication_type => filters[:publication_type]
          })
        end

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

      def active_publication(country_code, publication_slug)
        dataset = db[:publications]
          .where({
            :country_code => country_code,
            :slug => publication_slug,
            :status => ["active", "approved"],
          })
          .join(:breeds, :publications__breed_id => :breeds__id)
          .select_all(:publications)
          .select_append(:breeds__name___breed)

        publication = dataset.first

        if publication
          attachments = db[:attachments].where({
            :publication_id => publication[:id]
          })

          publication[:attachments] = attachments.map { |a| a[:image] }
        end

        publication
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

      def slug_exists?(slug)
        !db[:publications].where(:slug => slug).empty?
      end

    end
  end
end

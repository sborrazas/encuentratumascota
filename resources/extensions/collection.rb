module Encuentratumascota
  module Resources
    module Extensions
      module Collection

        DEFAULT_MAX_PER_PAGE = 100

        def paginate(params, &block)
          attrs = coerce_params(params) do |coercer|
            coercer.coerce_attr(:page, :integer, :default => 1)
            coercer.coerce_attr(:per_page, :integer, {
              :default => DEFAULT_MAX_PER_PAGE,
            })
          end

          block.call(attrs.fetch(:page), attrs.fetch(:per_page))
        end

      end
    end
  end
end

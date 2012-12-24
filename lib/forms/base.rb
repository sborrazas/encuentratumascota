module Forms

  class Base
    def initialize(params, options = {})
      @params = params
      @options = options
    end

    def valid?
      errors.empty?
    end

    def errors
      @errors ||= process_errors(@params, @options)
    end

    def get_resource
      self.build_resource(@params, @options)
    end

    def default_errors_hash
      Hash.new {|h, k| h[k] = [] }
    end
  end
end

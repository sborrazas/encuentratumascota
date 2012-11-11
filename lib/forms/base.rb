module Forms
  class Base
    def initialize(params)
      @params = params
    end

    def valid?
      errors.empty?
    end

    def errors
      @errors ||= process_errors(@params)
    end

    def default_errors_hash
      Hash.new {|h, k| h[k] = [] }
    end
  end
end

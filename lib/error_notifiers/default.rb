require "armadillo"

module ErrorNotifiers
  class Default

    attr_reader :exception
    attr_reader :environment

    def initialize(exception, options = {})
      @exception = exception
      @environment = options.fetch(:environment)
      @templates_dir = options.fetch(:templates_dir)
      @logs_dir = options.fetch(:logs_dir)
    end

    def log
      dirname, filename = Time.now.utc.strftime("%Y%m%d_%H%M%S%L").split("_")
      dirname = File.join(@logs_dir, dirname)
      filename = "#{self.class.name.gsub(/^.*\:/, "").downcase}_#{filename}"
      unless File.directory?(dirname)
        FileUtils.mkdir(dirname)
      end
      File.open(File.join(dirname, filename), "w") { |f| f.puts(content) }
    end

    def content
      @content ||= Armadillo.render(template_name, { :notifier => self }, {
        :base_path => @templates_dir,
      })
    end

    def exception_class_name
      exception.class.name
    end

    def template_name
      raise NotImplementedError.new(
        "`#{self.class.name}`#template_name is an abstract method."
      )
    end

  end
end

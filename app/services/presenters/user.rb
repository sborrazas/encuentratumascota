module Presenters
  module User

    module_function

    def self.to_json_hash(user, options = {})
      {
        display: user.display,
        image_url: user.image_url
      }
    end
  end
end

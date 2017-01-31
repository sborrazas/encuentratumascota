class Resource

  module ACL
    EVERYONE = :everyone
  end

  class NotFound < StandardError; end
  class KeyError < StandardError; end
  class Forbidden < StandardError; end

  attr_accessor :request
  attr_accessor :settings

  def initialize(settings, request)
    @settings = settings
    @request = request
  end

  def [](key)
    raise Resource::KeyError.new
  end

  def consume(slices)
    if slices.any?
      resource, rest, ancestors = self[slices.first].consume(slices[1..-1])

      [resource, rest, [self] + ancestors]
    else
      [self, [], []]
    end
  rescue KeyError => ex
    [self, slices, []]
  end

  def authorized?(permission)
    acl.any? do |(group, _permission)|
      permission == _permission && authorized_group?(group)
    end
  end

  def perform_action(action, params = {})
    send(action, params)
  end

  def respond_to_action?(action)
    acl.any? { |_, acl_action| acl_action == action }
  end

  private

  def authorized_group?(group)
    group == ACL::EVERYONE
  end

  def acl
    []
  end

end

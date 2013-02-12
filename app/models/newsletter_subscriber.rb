class NewsletterSubscriber < ActiveRecord::Base

  scope :sorted, order('newsltter_subscribers.created_at DESC')

end

Encuentratumascota::Application.routes.draw do

  root to: 'main#index'

  resources :publications, only: %w(create)

  # Authentication
  resource :sessions, only: %w(create)
  resource :registrations, only: %w(create)
  match '/auth/:provider/callback', to: 'sessions#create_with_omniauth'
  match '/auth/failure', to: 'sessions#failure'

  # Admin
  get 'admin', to: 'admin/publications#index'
  namespace :admin do
    resources :publications, only: %w(index new create edit update)
  end
end

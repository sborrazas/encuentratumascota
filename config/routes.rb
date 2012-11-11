Encuentratumascota::Application.routes.draw do

  root to: 'main#index'

  resources :publications, only: %w(new create)
  resource :sessions, only: %w(create)
  resource :registrations, only: %w(create)

  match '/auth/:provider/callback', to: 'sessions#create_with_omniauth'
  match '/auth/failure', to: 'sessions#failure'

end

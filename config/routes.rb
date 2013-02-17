Encuentratumascota::Application.routes.draw do

  root to: 'main#how_it_works'

  get 'app', to: 'main#index', as: :app

  resources :publications, only: %w(create show)

  # Authentication
  resource :sessions, only: %w(create) do
    collection do
      get :logout
    end
  end
  resource :registrations, only: %w(create)
  match '/auth/:provider/callback', to: 'sessions#create_with_omniauth'
  match '/auth/failure', to: 'sessions#failure'

  # Admin
  get 'admin', to: 'admin/publications#index'
  namespace :admin do
    resources :publications, only: %w(index new create edit update show)
    resources :users, only: %w(index edit update)
  end
end

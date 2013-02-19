Encuentratumascota::Application.routes.draw do

  root to: 'main#index'

  get 'how_it_works', to: 'main#how_it_works', as: :how_it_works

  resources :publications, only: %w(create show)

  # Authentication
  resource :sessions, only: %w(create) do
    collection do
      get :logout
    end
  end
  resource :registrations, only: %w(create)
  resource :users, only: %w(update)
  match '/auth/:provider/callback', to: 'sessions#create_with_omniauth'
  match '/auth/failure', to: 'sessions#failure'

  # Admin
  get 'admin', to: 'admin/publications#index'
  namespace :admin do
    resources :publications, only: %w(index new create edit update show) do
      member do
        get :close
      end
    end
    resources :users, only: %w(index edit update)
  end
end

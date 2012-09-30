Encuentratumascota::Application.routes.draw do

  ActiveAdmin.routes(self)

  root to: 'main#index'

  devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', sessions: 'users/sessions' }

  resources :publications, only: [:new]

end

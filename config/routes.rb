Encuentratumascota::Application.routes.draw do

  ActiveAdmin.routes(self)

  root to: 'main#index'

  devise_for :admin_users, ActiveAdmin::Devise.config

  resources :publications, only: [:new]

end

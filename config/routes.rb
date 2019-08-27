Rails.application.routes.draw do
  get "/tops/ramen" => "tops#ramen"
  root 'tops#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :tops

end

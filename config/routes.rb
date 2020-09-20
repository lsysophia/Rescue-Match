Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post "/login" => "sessions#create"
  delete "/logout" => "sessions#destroy"
  get "profile" => "users#profile"
  
  resources :users
  resources :pet_users
end

SearsHoliday::Application.routes.draw do


  match 'missions/list', to: 'missions#list'
  resources :missions, :only => [:index, :show]


  match 'signin', to: 'sessions#new'
  match 'sears/store_info', to: 'sears#store_info'
  match 'sears/offers', to: 'sears#offers'

  match 'pages/carosel', to: 'pages#carosel'
  match 'pages/zip_code_form', to: 'pages#zip_code_form'
  resources :pages, :only => :index
  
  root to: "home#show"


end

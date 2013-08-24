SearsHoliday::Application.routes.draw do

  match 'missions/list', to: 'missions#list'
  resources :missions, :only => [:index, :show]

end

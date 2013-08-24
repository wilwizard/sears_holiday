SearsHoliday::Application.routes.draw do

  resources :missions, :only => :index

end

class ApplicationController < ActionController::Base
  protect_from_forgery

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end
end

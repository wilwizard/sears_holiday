class PagesController < ApplicationController

	def index
	end

	def zip_code_form
		render 'zipcodeform', :layout => false
	end

	def carosel
		render 'carosel', :layout => false
	end

end

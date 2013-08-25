class SearsController < ApplicationController

	include ApplicationHelper

	def store_info
		render :json => get_store_info(params[:zip])
	end

	def offers
		render :json => get_offers(params[:store_number])
	end
end

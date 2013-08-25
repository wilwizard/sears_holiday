class MissionsController < ApplicationController

	def index
		#render :partial => 'show', :locals => { mission: mission }
	end

	def show
		mission = Mission.find(params[:id])
		render :partial => 'show', :locals => { mission: mission }
	end

	def list
		@missions = Mission.all
		render :json => @missions, :partial => 'list', :locals => { :missions => @missions }
	end
end

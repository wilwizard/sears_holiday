class MissionsController < ApplicationController

	def index
		missions = Mission.all
		render :missions, layout: false, :locals => { missions: missions }
	end

	def show
		mission = Mission.find(params[:id])
		render :partial => 'show', :locals => { mission: mission }
	end

	def list
		missions = Mission.all
		render :list, :layout => false, :locals => { missions: missions }
	end


	

end
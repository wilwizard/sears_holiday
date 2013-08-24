class MissionsController < ApplicationController

	def index
	end

	def show
		mission = Mission.find(params[:id])
		render :partial => 'show', :locals => { mission: mission }
	end

	def list
		missions = Mission.all
		render_to_string :list, :layout => false, :locals => { missions: missions }
	end


	

end
class MissionsController < ApplicationController

	def index
		@missions = Mission.all
		render :json => @missions
	end

	private

	def create_hash(missions)
		hash = {}
		missions.each do |mission|
			hash[mission.title] = render :partial => 'show', :locals => {mission: mission}
		end
		hash
	end

end
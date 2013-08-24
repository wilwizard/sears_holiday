class MissionsController < ApplicationController

	def index
		@missions = Mission.all
		create_hash(@missions).to_json
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
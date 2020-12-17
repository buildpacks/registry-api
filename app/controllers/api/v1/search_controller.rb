class Api::V1::SearchController < ApplicationController

  # GET /search
  def index
    search_params = params.permit(:matches)

    if search_params[:matches] && !(m = search_params[:matches]).empty?
      buildpacks = Buildpack.search(m)

      # TODO
      # - group the buildpacks by ns/name
      # - figure out which one is the "latest"
      # - create a map with {"latest": {...}, "versions": {...}}
      # - put each map in an array
      # - paginate the array

      render json: buildpacks
    else
      render json: {error: "Missing search string 'matches'"}, status: :bad_request
    end
  end
end

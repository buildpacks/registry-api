class Api::V1::SearchController < ApplicationController
  def index
    search_params = params.permit(:matches)

    if search_params[:matches] && !(m = search_params[:matches]).empty?
      buildpacks = Buildpack.search(m)
      render json: buildpacks
    else
      render json: {error: "Missing search string 'matches'"}, status: :bad_request
    end
  end
end

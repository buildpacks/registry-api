class Api::V1::SearchController < ApplicationController
  def index
    search_params = params.permit(:matches)

    if !(m = search_params[:matches]).empty?

      # TODO search the database

      render json: { matches: m }
    else
      render json: {error: "Missing search string 'matches'"}, status: :bad_request
    end
  end
end

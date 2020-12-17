class Api::V1::BuildpacksController < ApplicationController

  # GET /buildpacks/:namespace/:name
  def index
    buildpack_params = params.permit(:name, :namespace)

    @buildpacks = Buildpack.where(buildpack_params)

    # TODO
    # - figure out which one is the "latest"
    # - maybe s/id/ref/ so as not to mix them up
    # - replace each version with a _link
    # - create a map with {"latest": {...}, "versions": {...}}

    render json: @buildpacks || []
  end

  # GET /buildpacks/:namespace/:name/:version
  def show
    buildpack_params = params.permit(:name, :namespace, :version)

    @buildpack = Buildpack.find_by(buildpack_params)

    render json: @buildpack || []
  end
end

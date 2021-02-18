class Api::V1::BuildpacksController < ApplicationController

  # GET /buildpacks/:namespace/:name
  def index
    buildpack_params = params.permit(:name, :namespace)

    buildpacks = Buildpack.
    select(
      :version,
      :namespace,
      :name,
      :description,
      :homepage,
      :licenses,
      :stacks,
      :id
    ).
    where(buildpack_params).order(
      version_major: :desc,
      version_minor: :desc,
      version_patch: :desc,
    )

    if buildpacks.empty?
      render json: unknown_buildpack, status: :not_found
    else
      versions = buildpacks.map do |b|
        {
          "version": b.version,
          # TODO make the host a variable/constant
          "_link": "https://#{ENV.fetch('CNB_API_HOST') {'registry.buildpacks.io'}}/api/v1/buildpacks/#{b.namespace}/#{b.name}/#{b.version}"
        }
      end

      render json: { "latest": buildpacks[0], "versions": versions }
    end
  end

  # GET /buildpacks/:namespace/:name/:version
  def show
    buildpack_params = params.permit(:name, :namespace, :version)

    @buildpack = Buildpack.find_by(buildpack_params)

    if @buildpack
      render json: @buildpack
    else
      render json: unknown_buildpack, status: :not_found
    end
  end

  private

  def unknown_buildpack
    {error: "Unknown buildpack"}
  end
end

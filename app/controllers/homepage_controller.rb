class HomepageController < ApplicationController
  before_action :set_buildpack, only: [:show]

  def index
  end

  def show
    if @buildpack
      render
    else
      head 404
    end
  end

  private def set_buildpack
    @buildpack = Buildpack.where(namespace: params[:namespace], name: params[:name]).first
  end
end

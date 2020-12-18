class Api::V1::SearchController < ApplicationController

  # GET /search
  def index
    search_params = params.permit(:matches)

    if search_params[:matches] && !(m = search_params[:matches]).empty?
      buildpacks = Buildpack.search(m)

      tmp_map = {}
      buildpacks.each do |bp|
        bp_id = "#{bp.namespace}#{bp.name}"
        # first time a buildpack with this namespace and name are found
        if tmp_map[bp_id].nil?
          tmp_map[bp_id] = {
            latest: bp,
            versions: [bp.version]
          }
        else
          # found an existing buildpack with a matching namespace and name.  Now,
          # compare this buildpack version with the others to see if it's newer.
          latest_bp = tmp_map[bp_id]
          latest_bp[:versions] = update_versions(latest_bp[:versions], bp.version)
          if latest_bp[:versions][0] == bp.version
            latest_bp[:latest] = bp
          end
        end
      end

      # re-map the results to be an array of objects with the versions containing an array of
      # version objects.
      result = tmp_map.collect do |_, b|
        b[:versions] = b[:versions].map do |v|
          {
            "version": v,
            "_link": "https://registry.buildpacks.io/api/v1/buildpacks/#{b[:latest][:namespace]}/#{b[:latest][:name]}/#{v}"
          }
        end
        b
      end

      # TODO
      # - group the buildpacks by ns/name
      # - figure out which one is the "latest"
      # - replace each version with a _link
      # - create a map with {"latest": {...}, "versions": {...}}
      # - put each map in an array
      # - paginate the array

      render json: result
    else
      render json: { error: "Missing search string 'matches'" }, status: :bad_request
    end
  end

  def update_versions(versions, new_version)
    versions.each_with_index do |v, i|
      if Gem::Version.new(new_version) > Gem::Version.new(v)
        return versions.insert(i, new_version)
      end
      if i == versions.length() - 1
        return versions.push(new_version)
      end
    end
  end
end

Rails.application.routes.draw do
  root 'homepage#index'

  namespace :buildpacks do
    get ':namespace/:name', to: '/homepage#show'
    get ':namespace/:name/version/:version', to: '/homepage#show'
  end

  namespace :api do
    namespace :v1 do #, constraints: ApiConstraint.new(version: "1.buildpack-registry") do
      get 'search', to: 'search#index'
      get 'buildpacks/:namespace/:name', to: 'buildpacks#index'
      get 'buildpacks/:namespace/:name/:version', to: 'buildpacks#show',
            :constraints => { :version => /[0-9]+\.[0-9]+\.[0-9]+[0-9A-Za-z\-\.]*/ }
    end
  end
end

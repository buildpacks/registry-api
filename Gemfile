source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.6'

gem 'committee'
gem 'newrelic_rpm'
gem 'pg'
gem 'puma', '~> 5.6'
gem 'rack-attack'
gem 'rack-cors'
gem 'rails', '~> 6.1.0'
gem 'rollbar'
gem 'toml'
gem 'jsbundling-rails', '~> 1.3'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'dotenv-rails'
  gem 'minitest-reporters'
  gem 'mocha'
  gem 'prmd'
  gem 'rubocop'
  gem 'simplecov'
  gem 'vcr'
end

group :development do
  gem 'listen', '~> 3.3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

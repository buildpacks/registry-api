source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.2'

gem 'rails', '~> 6.1.0'
gem 'pg'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'toml'
gem 'committee'
gem 'rollbar'
gem 'rack-cors'
gem 'rack-attack'
gem 'webpacker', '~> 5.2', '>= 5.2.1'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'prmd'
  gem 'dotenv-rails'
  gem 'minitest-reporters'
  gem 'mocha'
  gem 'rubocop'
  gem 'simplecov'
  gem 'vcr'
end

group :development do
  gem 'listen', '~> 3.3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

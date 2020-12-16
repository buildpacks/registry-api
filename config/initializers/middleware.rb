Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource(
      '*',
      max_age: 1728000,
      credentials: false,
      methods: [
        :get, :post, :delete, :put, :patch, :options, :head],
      headers: [
        "Accept",
        "Accept-Expansion",
        "Accept-Inclusion",
        "Authorization",
        "Cache-Control",
        "Content-Type",
        "If-Modified-Since",
        "If-None-Match",
        "Range",
        "Request-Id",
        "X-Confirmation-Required",
        "X-Origin",
        "X-Range",
        "X-Request-Id"],
      expose: [
        "Cache-Control",
        "Content-Language",
        "Content-Type",
        "Expires",
        "Last-Modified",
        "Next-Range",
        "Pragma"]
    )
  end
end

# Rails.application.config.middleware.use(
#   Committee::Middleware::RequestValidation,
#   schema: JSON.parse(Rails.root.join('schema', 'schema.json').read)
# )

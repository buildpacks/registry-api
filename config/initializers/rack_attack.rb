class Rack::Attack
  # `Rack::Attack` is configured to use the `Rails.cache` value by default,
  # but you can override that by setting the `Rack::Attack.cache.store` value
  # Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  # Allow an IP address to make 5 requests every 5 seconds
  if !Rails.env.test? && !Rails.env.development?
    throttle('req/ip', limit: 10, period: 5) do |req|
      req.ip
    end
  end

  # Send the following response to throttled clients
  self.throttled_response = ->(env) {
    retry_after = (env['rack.attack.match_data'] || {})[:period]
    [
      429,
      { 'Content-Type' => 'application/json', 'Retry-After' => retry_after.to_s },
      [{ error: "Throttle limit reached. Retry later." }.to_json]
    ]
  }
end

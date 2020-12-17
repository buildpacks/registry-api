require "test_helper"

class Api::V1::BuildpacksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get "/api/v1/buildpacks/example/first"
    assert_response :success
  end

  test "should get show" do
    get "/api/v1/buildpacks/example/first/1.0.0"
    assert_response :success
  end
end

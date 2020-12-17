require "test_helper"

class Api::V1::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get "/api/v1/search?matches=example"
    assert_response :success
  end
end

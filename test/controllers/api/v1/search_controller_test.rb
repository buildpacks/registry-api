require "test_helper"

class Api::V1::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get "/api/v1/search?matches=example"
    assert_response :success
    b = JSON.parse(response.body)
    assert_equal 2, b.size
    assert_equal 'example', b[0]['namespace']
  end
end

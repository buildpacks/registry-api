require "test_helper"

class Api::V1::BuildpacksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get "/api/v1/buildpacks/example/first"
    assert_response :success
    b = JSON.parse(response.body)
    assert_equal 1, b.size
    assert_equal 'example', b[0]['namespace']
    assert_equal 'first', b[0]['name']
    assert_equal '1.0.0', b[0]['version']
  end

  test "should get show" do
    get "/api/v1/buildpacks/example/first/1.0.0"
    assert_response :success
    b = JSON.parse(response.body)
    assert_equal 'example', b['namespace']
    assert_equal 'first', b['name']
    assert_equal '1.0.0', b['version']
  end
end

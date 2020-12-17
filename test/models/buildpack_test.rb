require "test_helper"

class BuildpackTest < ActiveSupport::TestCase
  test "search" do
    b = Buildpack.search("example")
    assert_equal 2, b.size
    assert_equal 'example', b[0].namespace
  end
end

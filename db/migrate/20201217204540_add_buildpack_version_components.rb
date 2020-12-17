class AddBuildpackVersionComponents < ActiveRecord::Migration[6.1]
  def change
    change_table :buildpacks do |t|
      t.string :version_major, limit: 120, default: "0", null: false
      t.string :version_minor, limit: 120, default: "0", null: false
      t.string :version_patch, limit: 120, default: "0", null: false
    end
  end
end

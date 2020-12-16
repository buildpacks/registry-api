class CreateBuildpacks < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'uuid-ossp'

    create_table :buildpacks, id: :uuid, default: -> { "uuid_generate_v4()" } do |t|
      t.string :namespace, limit: 250, null: false
      t.string :name, limit: 250, null: false
      t.string :version, limit: 250, null: false
      t.string :addr, limit: 250, null: false
      t.boolean :yanked, default: false
      t.text :description
      t.text :homepage
      t.text :licenses, array: true, default: []
      t.text :stacks, array: true, default: []

      t.timestamps

      t.index ["name", "namespace", "version"], name: "index_buildpacks_on_name_namespace_version", unique: true
    end
  end
end

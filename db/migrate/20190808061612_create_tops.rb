class CreateTops < ActiveRecord::Migration[5.2]
  def change
    create_table :tops,:options => 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|

      t.timestamps
    end
  end
end

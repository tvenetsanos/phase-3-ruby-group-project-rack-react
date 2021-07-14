class Console < ActiveRecord::Base
    has_many :game
    belongs_to :user
end
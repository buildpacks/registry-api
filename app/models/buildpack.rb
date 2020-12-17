class Buildpack < ApplicationRecord

  def self.search(matches)
    self.where(<<-SQL, "%#{matches}%", "%#{matches}%", "%#{matches}%")
description ILIKE ? OR
namespace ILIKE ? OR
name ILIKE ?
SQL
  end

  def readonly?
    true
  end
end

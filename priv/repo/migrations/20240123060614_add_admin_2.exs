defmodule Nheindev.Repo.Migrations.AddAdmin2 do
  use Ecto.Migration
  alias Nheindev.Accounts

  def change do
    user = Accounts.get_user!(3)
    user = Ecto.Changeset.change(user, is_admin: true)
    Nheindev.Repo.update!(user)
  end
end

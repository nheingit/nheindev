defmodule Nheindev.Repo.Migrations.AddAdmin3 do
  use Ecto.Migration
  alias Nheindev.Accounts

  def change do
    user = Accounts.get_user!(4)
    user = Ecto.Changeset.change(user, is_admin: true)
    Nheindev.Repo.update!(user)
  end
end

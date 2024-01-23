defmodule Nheindev.Repo.Migrations.AddAdmin do
  alias Nheindev.Accounts
  use Ecto.Migration
  use Nheindev.Repo

  def change do
    user = Accounts.get_user!(3)
    user = Ecto.Chageset.change(user, is_admin: true)
  end
end

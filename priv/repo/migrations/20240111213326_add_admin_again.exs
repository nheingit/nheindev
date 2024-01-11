defmodule Nheindev.Repo.Migrations.AddAdminAgain do
  alias Nheindev.Accounts
  use Ecto.Migration

  def change do
    user = Accounts.get_user!(2)
    user = Ecto.Changeset.change(user, is_admin: true)
  end
end

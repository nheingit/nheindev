defmodule Nheindev.Repo.Migrations.AddImageToBlog do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :image_url, :string
    end
  end
end

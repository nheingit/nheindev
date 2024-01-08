defmodule Nheindev.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :content, :map

      timestamps(type: :utc_datetime)
    end
  end
end

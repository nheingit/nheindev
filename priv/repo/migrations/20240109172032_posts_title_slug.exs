defmodule Nheindev.Repo.Migrations.PostsTitleSlug do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :title, :string
      add :slug, :string
    end

  end
end

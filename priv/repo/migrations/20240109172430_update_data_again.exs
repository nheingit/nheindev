defmodule Nheindev.Repo.Migrations.UpdateDataAgain do
  use Ecto.Migration

  def change do
      # Optional: Provide default values for existing records
      Nheindev.Repo.start_link()
      Nheindev.Blog.Post
      |> Nheindev.Repo.all()
      |> Enum.each(fn post ->
        updated_post = %{post | title: "Default Title", slug: "default-slug-#{post.id}"}
        Nheindev.Blog.Post.changeset(updated_post, %{})
        |> Nheindev.Repo.update!()
      end)
  end
end

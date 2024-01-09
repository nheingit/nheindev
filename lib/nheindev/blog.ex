defmodule Nheindev.Blog do
  alias Nheindev.Repo
  alias Nheindev.Blog.Post

  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

end

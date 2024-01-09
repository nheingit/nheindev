defmodule Nheindev.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :content, :map

    timestamps(type: :utc_datetime)
  end

  def create_post(attrs \\ %{}) do
    %Nheindev.Blog.Post{}
    |> Nheindev.Blog.Post.changeset(attrs)
    |> Nheindev.Repo.insert()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end
end

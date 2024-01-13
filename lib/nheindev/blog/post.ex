defmodule Nheindev.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :title, :string
    field :slug, :string
    field :content, :map
    field :is_published, :boolean, default: false
    timestamps(type: :utc_datetime)
  end

  def get_post_by_slug(slug) do
    Nheindev.Repo.get_by(Nheindev.Blog.Post, slug: slug)
  end

  def get_post_by_id(id) do
    Nheindev.Repo.get_by(Nheindev.Blog.Post, id: id)
  end

  def create_post(attrs \\ %{}) do
    %Nheindev.Blog.Post{}
    |> Nheindev.Blog.Post.changeset(attrs)
    |> Nheindev.Repo.insert()
  end

  def update_post(attrs \\ %{}) do
    %Nheindev.Blog.Post{}
    |> Nheindev.Blog.Post.changeset(attrs)
    |> Nheindev.Repo.update()
  end

  def delete_post(post) do
    Nheindev.Repo.delete(post)
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :content, :slug, :is_published])
    |> validate_required([:title, :content])
    |> validate_slug()
    |> maybe_generate_slug()
  end

  defp validate_slug(changeset) do
    case get_change(changeset, :slug) do
      nil -> changeset
      slug ->
        slug
        |> String.downcase()
        |> String.replace(~r/[^\w\s-]/u, "") # Keep only letters, numbers, spaces, and hyphens
        |> String.replace(~r/\s+/, "-") # Replace spaces with hyphens
        |> String.replace(~r/--+/u, "-") # Replace multiple hyphens with a single one
        |> (fn slug ->
              if String.length(slug) > 0, do: changeset, else: add_error(changeset, :slug, "Slug is not valid")
            end).()
    end
  end

  defp maybe_generate_slug(changeset) do
    if get_change(changeset, :slug) in [nil, ""] do
      title = get_field(changeset, :title) |> to_slug()
      put_change(changeset, :slug, title)
    else
      changeset
    end
  end

  defp to_slug(nil), do: nil
  defp to_slug(title) do
    title
    |> String.downcase()
    |> String.replace(~r/[^\w\s-]/u, "") # Keep only letters, numbers, spaces, and hyphens
    |> String.replace(~r/\s+/, "-") # Replace spaces with hyphens
    |> String.replace(~r/--+/u, "-") # Replace multiple hyphens with a single one
  end
end

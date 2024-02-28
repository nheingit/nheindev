defmodule NheindevWeb.PageController do
  use NheindevWeb, :controller
  import Ecto.Query
  alias Nheindev.Repo
  alias Nheindev.Blog.Post

  def home(conn, _params) do
    posts_query = from p in Post, limit: 3, where: p.is_published == true
    posts = Repo.all(posts_query)
    render(conn, :home, posts: posts, layout: false)
  end

  def get_first_paragraph_text(blocks) do
    blocks
    |> Enum.find(fn block -> block["type"] == "paragraph" end)
    |> Map.get("data")
    |> Map.get("text")
  end

  def posts(conn, _params) do
    posts_query = from p in Post, where: p.is_published == true
    posts = Repo.all(posts_query)
    render(conn, :posts, posts: posts, layout: false)
  end
end

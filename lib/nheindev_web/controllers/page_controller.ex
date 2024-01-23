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
end

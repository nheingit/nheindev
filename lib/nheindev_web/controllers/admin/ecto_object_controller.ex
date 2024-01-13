defmodule NheindevWeb.Admin.EctoObjectController do
  use NheindevWeb, :controller
  use NheindevWeb, :verified_routes


  alias Nheindev.Repo

  def show(conn, %{"ecto_object" => ecto_object}) do
    # Here, use ecto_object to query the database for the corresponding records
    # You'll need to implement logic to handle different object types
    records = fetch_records_for(ecto_object)
    render(conn, "#{ecto_object}.html", records: records, conn: conn)
  end

  def delete(conn, %{"id" => id}) do
    post = Nheindev.Blog.Post.get_post_by_id(id)
    Nheindev.Blog.Post.delete_post(post)

    conn
    |> put_flash(:info, "Post deleted successfully.")
    |> redirect(to: ~p"/admin/posts")
  end

  defp fetch_records_for("posts") do
    Repo.all(Nheindev.Blog.Post)
  end

  defp fetch_records_for("users") do
    Repo.all(Nheindev.Blog.Post)
  end
end

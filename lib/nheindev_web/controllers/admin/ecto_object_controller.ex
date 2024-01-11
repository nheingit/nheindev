defmodule NheindevWeb.Admin.EctoObjectController do
  use NheindevWeb, :controller

  alias Nheindev.Repo

  def show(conn, %{"ecto_object" => ecto_object}) do
    # Here, use ecto_object to query the database for the corresponding records
    # You'll need to implement logic to handle different object types
    records = fetch_records_for(ecto_object)
    render(conn, "#{ecto_object}.html", records: records)
  end

  defp fetch_records_for("posts") do
    Repo.all(Nheindev.Blog.Post)
  end
end

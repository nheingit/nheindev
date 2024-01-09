defmodule NheindevWeb.Admin.EctoObjectController do
  use NheindevWeb, :controller
  def show(conn, %{"ecto_object" => ecto_object}) do
    # Here, use ecto_object to query the database for the corresponding records
    # You'll need to implement logic to handle different object types
    render(conn, "#{ecto_object}.html")
  end
end

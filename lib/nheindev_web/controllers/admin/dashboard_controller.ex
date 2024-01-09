defmodule Nheindevweb.Admin.DashboardController do
  use NheindevWeb, :controller
  def index(conn, _params) do
    # Here you can retrieve and assign data for your dashboard
    # For example, list of Ecto objects, summary stats, etc.
    render(conn, "index.html")
  end
end

defmodule NheindevWeb.Admin.DashboardController do
  use NheindevWeb, :controller
  def index(conn, _params) do
    # Here you can retrieve and assign data for your dashboard
    # For example, list of Ecto objects, summary stats, etc.
    tables_query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name != 'schema_migrations'"
    result = Ecto.Adapters.SQL.query!(Nheindev.Repo, tables_query, [])
    tables = Enum.map(result.rows, fn [table_name] -> table_name end)
    render(conn, "index.html", ecto_objects: tables)
  end
end

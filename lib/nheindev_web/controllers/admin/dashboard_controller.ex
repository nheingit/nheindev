defmodule NheindevWeb.Admin.DashboardController do
  use NheindevWeb, :controller
  def index(conn, _params) do
    tables_query = "
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name != 'schema_migrations'
    AND table_name != 'users_tokens'
    "
    result = Ecto.Adapters.SQL.query!(Nheindev.Repo, tables_query, [])
    tables = Enum.map(result.rows, fn [table_name] -> table_name end)
    render(conn, "index.html", ecto_objects: tables)
  end
end

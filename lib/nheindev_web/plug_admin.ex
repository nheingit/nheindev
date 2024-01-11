defmodule NheindevWeb.Plugs.AdminAuth do
  use NheindevWeb, :controller
  import Plug.Conn

  def init(default), do: default

  def call(conn, _default) do
    current_user = conn.assigns[:current_user]

    if current_user && current_user.is_admin do
      conn
    else
      conn
      |> put_flash(:error, "You must be an admin to access this section")
      |> redirect(to: "/")
      |> halt()
    end
  end
end

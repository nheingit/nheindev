defmodule NheindevWeb.EditorLive do
  use NheindevWeb, :live_view

  @impl true
  def mount(_session, _connect_info, socket) do
    {:ok, assign(socket, :editor_content, %{})}
  end

  @impl true
  def handle_event("save_content", params, socket) do
    # Here, you will receive and handle the content saved from Editor.js
    {:noreply, assign(socket, :stuff, params)}
  end
end

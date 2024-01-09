defmodule NheindevWeb.EditorLive do
  use NheindevWeb, :live_view
  alias Nheindev.Blog

  @impl true
  def mount(_session, _connect_info, socket) do
    {:ok, assign(socket, :editor_content, %{})}
  end

  @impl true
  def handle_event("save_content", %{"value" => content}, socket) do
    case Blog.create_post(%{content: content}) do
      {:ok, post} ->
        # Handle success (e.g., send a success message, redirect, etc.)
        {:noreply, socket}
      {:error, changeset} ->
        # Handle error (e.g., send an error message back to the user)
        {:noreply, socket}
    end
  end
end

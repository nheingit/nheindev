defmodule NheindevWeb.EditorLive do
  use NheindevWeb, :live_view
  alias Nheindev.Blog.Post

  @impl true
  def mount(_session, _connect_info, socket) do
    {:ok, assign(socket, :editor_content, %{})}
  end

  @impl true
  def handle_event("save_content", %{"title" => title, "value" => content}, socket) do
    case Post.create_post(%{title: title, content: content}) do
      {:ok, post} ->
        IO.inspect('ok post')
        # Handle success (e.g., send a success message, redirect, etc.)
        {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}
      {:error, changeset} ->
        IO.inspect('error', changeset)
        # Handle error (e.g., send an error message back to the user)
        {:noreply, socket}
    end
  end
end

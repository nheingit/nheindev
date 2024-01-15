defmodule NheindevWeb.Admin.NewPostEditorLive do
  use NheindevWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :editor_content, %{})}
  end

  @impl true
  def handle_event(
        "save_content",
        %{"title" => title, "value" => content, "is_published" => is_published},
        socket
      ) do
    case Nheindev.Blog.Post.create_post(%{
           title: title,
           content: content,
           is_published: is_published
         }) do
      {:ok, post} ->
        # Handle success (e.g., send a success message, redirect, etc.)
        {:noreply, push_navigate(socket, to: "/admin/posts/editor/#{post.slug}")}

      {:error, _changeset} ->
        # Handle error (e.g., send an error message back to the user)
        {:noreply, socket}
    end
  end
  def handle_event("update_title", %{"value" => _title}, socket) do
    {:noreply, socket}
  end
  def handle_event("update_content", %{"value" => _content}, socket) do
    {:noreply, socket}
  end
end

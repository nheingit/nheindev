defmodule NheindevWeb.Admin.EditorLive do
  use NheindevWeb, :live_view
  alias Nheindev.Repo
  alias Nheindev.Blog.Post

  @impl true
  def mount(params, _session, socket) do
    post = Post.get_post_by_slug(params["slug"])
    json_content = Jason.encode!(post.content)
    socket = socket
      |> assign(:editor_content, json_content)
      |> assign(:post, post)
      |> assign(:slug, params["slug"])

    {:ok, socket}
  end

  @impl true
  def handle_event("save_content", %{"title" => title, "value" => content}, socket) do
    slug = socket.assigns.slug
    case Post.get_post_by_slug(slug) do
      nil ->
        create_post(title, content, socket)
      post ->
        update_post(post, title, content, socket)
    end
  end

    defp create_post(title, content, socket) do
      case Post.create_post(%{title: title, content: content}) do
        {:ok, post} ->
          {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}
        {:error, _changeset} ->
          {:noreply, socket}
      end
    end

    defp update_post(post, title, content, socket) do
      changeset = Post.changeset(post, %{title: title, content: content})

      case Repo.update(changeset) do
        {:ok, post} ->
          {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}
        {:error, _changeset} ->
          {:noreply, socket}
      end
    end
end

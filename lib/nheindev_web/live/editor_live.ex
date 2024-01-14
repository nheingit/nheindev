defmodule NheindevWeb.Admin.EditorLive do
  use NheindevWeb, :live_view
  alias Nheindev.Repo
  alias Nheindev.Blog.Post

  @impl true
  def mount(params, _session, socket) do
    post = Post.get_post_by_slug(params["slug"])
    json_content = Jason.encode!(post.content)

    socket =
      socket
      |> assign(:editor_content, json_content)
      |> assign(:post, post)
      |> assign(:slug, params["slug"])
      |> assign(:live_view, NheindevWeb.PostLive)

    {:ok, socket}
  end

  @impl true
  def handle_event(
        "save_content",
        %{"title" => title, "value" => content, "is_published" => is_published},
        socket
      ) do
    slug = socket.assigns.slug

    case Post.get_post_by_slug(slug) do
      nil ->
        create_post(title, content, socket)

      post ->
        update_post(post, title, content, is_published, socket)
    end
  end

  def handle_event("update_title", %{"value" => title}, socket) do
    # Broadcast the updated title
    Phoenix.PubSub.broadcast(Nheindev.PubSub, "post:#{socket.assigns.slug}", {:title_updated, title})
    {:noreply, socket}
  end

  def handle_event("update_content", %{"value" => content}, socket) do
    # Broadcast the updated content
    Phoenix.PubSub.broadcast(Nheindev.PubSub, "post:#{socket.assigns.slug}", {:content_updated, content})
    {:noreply, socket}
  end

  defp create_post(title, content, socket) do
    case Post.create_post(%{title: title, content: content}) do
      {:ok, post} ->
        {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}

      {:error, _changeset} ->
        {:noreply, socket}
    end
  end

  defp update_post(post, title, content, is_published, socket) do
    IO.inspect(is_published)

    changeset =
      Post.changeset(post, %{title: title, is_published: is_published, content: content})

    IO.inspect(changeset)

    case Repo.update(changeset) do
      {:ok, post} ->
        IO.inspect(post)
        {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}

      {:error, _changeset} ->
        {:noreply, socket}
    end
  end
end

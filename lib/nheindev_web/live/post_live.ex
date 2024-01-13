defmodule NheindevWeb.PostLive do
  use NheindevWeb, :live_view

  def mount(%{"slug" => slug}, _session, socket) do
    post = Nheindev.Blog.Post.get_post_by_slug(slug)
    if post.is_published do
      {:ok, assign(socket, post: post)}
    else
      {:ok, push_navigate(socket, to: "/")}
    end
  end
  def mount(_params, %{"slug" => slug }, socket) do
    post = Nheindev.Blog.Post.get_post_by_slug(slug)
    Phoenix.PubSub.subscribe(Nheindev.PubSub, "post:#{slug}:title")
    Phoenix.PubSub.subscribe(Nheindev.PubSub, "post:#{slug}:content")
    if post do
      {:ok, assign(socket, post: post)}
    else
      {:ok, push_navigate(socket, to: "/")}
    end
  end
  def handle_info(%{event: "title_updated", payload: title}, socket) do
    {:noreply, assign(socket, :post, %{socket.assigns.post | title: title})}
  end

  def handle_info(%{event: "content_updated", payload: content}, socket) do
    {:noreply, assign(socket, :post, %{socket.assigns.post | content: content})}
  end
end

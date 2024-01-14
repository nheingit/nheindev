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
    Phoenix.PubSub.subscribe(Nheindev.PubSub, "post:#{slug}")
    Phoenix.PubSub.subscribe(Nheindev.PubSub, "post:#{slug}")
    if post do
      {:ok, assign(socket, post: post)}
    else
      {:ok, push_navigate(socket, to: "/")}
    end
  end
  def handle_info({:title_updated, title}, socket) do
    # Update the post title in the socket assigns
    {:noreply, assign(socket, :post, %{socket.assigns.post | title: title})}
  end

  def handle_info({:content_updated, content}, socket) do
    {:noreply, assign(socket, :post, %{socket.assigns.post | content: content})}
  end
end

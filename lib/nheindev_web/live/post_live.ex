defmodule NheindevWeb.PostLive do
  use NheindevWeb, :live_view

  def mount(%{"slug" => slug}, _session, socket) do
    post = Nheindev.Blog.Post.get_post_by_slug(slug)
    if post do
      {:ok, assign(socket, post: post)}
    else
      {:ok, push_redirect(socket, to: "/")}
    end
  end
end

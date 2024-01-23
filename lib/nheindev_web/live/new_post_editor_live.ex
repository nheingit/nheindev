defmodule NheindevWeb.Admin.NewPostEditorLive do
  use NheindevWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :editor_content, %{})}
  end

  @impl true
  ## def handle_event(
        ## "save_content",
        ## %{"title" => title, "value" => content, "is_published" => is_published},
        ## socket
      ## ) do
    ## case Nheindev.Blog.Post.create_post(%{
           ## title: title,
           ## content: content,
           ## is_published: is_published
         ## }) do
      ## {:ok, post} ->
        ## # Handle success (e.g., send a success message, redirect, etc.)
        ## {:noreply, push_navigate(socket, to: "/admin/posts/editor/#{post.slug}")}

      ## {:error, _changeset} ->
        ## # Handle error (e.g., send an error message back to the user)
        ## {:noreply, socket}
    ## end
  ## end
  def handle_event(
        "save_content",
        %{
          "title" => title,
          "value" => content,
          "is_published" => is_published,
          "image_url" => image_url
        },
        socket
      ) do

    image_url_result =
      case image_url do
        nil -> {:ok, nil}
        _ -> Nheindev.Blog.ImageUploader.store(image_url)
      end

    case image_url_result do
      {:ok, image_url} ->
        case Nheindev.Blog.Post.create_post(%{
              title: title,
              content: content,
              is_published: is_published,
              image_url: image_url
            }) do
          {:ok, post} ->
            # Handle success (e.g., send a success message, redirect, etc.)
            {:noreply, push_navigate(socket, to: "/admin/posts/editor/#{post.slug}")}

          {:error, _changeset} ->
            # Handle error (e.g., send an error message back to the user)
            {:noreply, socket}
        end

      {:error, _reason} ->
        {:noreply, socket}
    end
  end

  def handle_event("upload_image", %{"image_url" => image}, socket) do
    case Nheindev.Blog.ImageUploader.store(image) do
      {:ok, image_url} ->
        # Store the image URL in the socket's state
        {:noreply, assign(socket, :image_url, image_url)}
      {:error, _reason} ->
        # Handle the error, maybe by sending a message to the user
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

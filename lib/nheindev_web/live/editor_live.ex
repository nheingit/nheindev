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
        %{
          "title" => title,
          "value" => content,
          "is_published" => is_published
        },
        socket
      ) do
    IO.inspect(socket.assigns, label: "Socket assigns before save_content")
    slug = socket.assigns.slug
    image_url = socket.assigns.image_url

    case Post.get_post_by_slug(slug) do
      nil ->
        create_post(title, content, image_url, socket)

      post ->
        update_post(post, title, content, is_published, image_url, socket)
    end
  end

  def handle_event("upload_image", %{"image_url" => base64_image}, socket) do
    with {:ok, binary} <- Base.decode64(base64_image),
         {:ok, file_path} <- write_to_temp_file(binary) do
      upload_struct = %Plug.Upload{path: file_path, filename: "upload.jpeg", content_type: "image/jpeg"}
      case Nheindev.Blog.ImageUploader.store({upload_struct, socket.assigns.current_user}) do
        {:ok, image_url} ->
          {:noreply, assign(socket, :image_url, image_url)}
        {:error, reason} ->
          IO.inspect(reason, label: "upload failed")
          # Handle the error, maybe by sending a message to the user
          {:noreply, socket}
      end
    else
      error ->
          IO.inspect(error, label: "error failed")
        # Handle the error for base64 decode or file write
        {:noreply, socket}
    end
  end

  def handle_event("update_title", %{"value" => title}, socket) do
    # Broadcast the updated title
    Phoenix.PubSub.broadcast(
      Nheindev.PubSub,
      "post:#{socket.assigns.slug}",
      {:title_updated, title}
    )

    {:noreply, socket}
  end

  def handle_event("update_content", %{"value" => content}, socket) do
    # Broadcast the updated content
    Phoenix.PubSub.broadcast(
      Nheindev.PubSub,
      "post:#{socket.assigns.slug}",
      {:content_updated, content}
    )

    {:noreply, socket}
  end

  defp create_post(title, content, image_url, socket) do
    case Post.create_post(%{title: title, content: content, image_url: image_url}) do
      {:ok, post} ->
        {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}

      {:error, _changeset} ->
        {:noreply, socket}
    end
  end

  defp write_to_temp_file(binary) do
    file_path = Path.join(System.tmp_dir(), "upload_#{:os.system_time()}.jpg")
    case File.write(file_path, binary) do
      :ok -> {:ok, file_path}
      error -> error
    end
  end

  defp update_post(post, title, content, is_published, image_url, socket) do
    changeset =
      Post.changeset(post, %{title: title, is_published: is_published, content: content, image_url: image_url})

    IO.inspect(changeset)

    case Repo.update(changeset) do
      {:ok, post} ->
        IO.inspect(post)
        {:noreply, push_navigate(socket, to: "/posts/#{post.slug}")}

      {:error, _changeset} ->
        {:noreply, socket}
    end
  end

  # For Photo uploads
  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname() |> String.downcase()

    case Enum.member?(~w(.jpg .jpeg .gif .png), file_extension) do
      true -> :ok
      false -> {:error, "invalid file type"}
    end
  end
end

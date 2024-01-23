defmodule Nheindev.Blog.ImageUploader do
  use Waffle.Definition
  use Waffle.Ecto.Definition

  @extensions ~w(.jpg .jpeg .gif .png)

  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname |> String.downcase

    case Enum.member?(@extensions, file_extension) do
      true -> :ok
      false -> {:error, "file type is invalid"}
    end
  end

  def filename(version, _) do
    version
  end

  def storage_dir(_, {_file, user}) do
    "uploads/images/#{user.id}"
  end

end

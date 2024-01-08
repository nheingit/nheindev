defmodule Nheindev.Repo do
  use Ecto.Repo,
    otp_app: :nheindev,
    adapter: Ecto.Adapters.Postgres
end

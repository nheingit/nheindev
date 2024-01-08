defmodule Nheindev.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      NheindevWeb.Telemetry,
      Nheindev.Repo,
      {DNSCluster, query: Application.get_env(:nheindev, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Nheindev.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Nheindev.Finch},
      # Start a worker by calling: Nheindev.Worker.start_link(arg)
      # {Nheindev.Worker, arg},
      # Start to serve requests, typically the last entry
      NheindevWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Nheindev.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    NheindevWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

defmodule NheindevWeb.Router do
  use NheindevWeb, :router

  import NheindevWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {NheindevWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", NheindevWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "posts", PageController, :posts
    get "hire", PageController, :hire
    get "contact", PageController, :contact
    post "contact", PageController, :submit_contact_form
    get "portfolio", PageController, :portfolio
    live "/posts/:slug", PostLive, as: :post
  end

  # Other scopes may use custom stacks.
  # scope "/api", NheindevWeb do
  #   pipe_through :api
  # end
  scope "/admin", NheindevWeb.Admin do
    pipe_through [:browser, :require_authenticated_user, NheindevWeb.Plugs.AdminAuth]

    get "/", DashboardController, :index
    get "/:ecto_object", EctoObjectController, :show
    delete "/:ecto_object/:id", EctoObjectController, :delete
    live "/posts/new", NewPostEditorLive
    live "/posts/editor/:slug", EditorLive
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:nheindev, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: NheindevWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  ## Authentication routes

  scope "/", NheindevWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    live_session :redirect_if_user_is_authenticated,
      on_mount: [{NheindevWeb.UserAuth, :redirect_if_user_is_authenticated}] do
      live "/users/register", UserRegistrationLive, :new
      live "/users/log_in", UserLoginLive, :new
      live "/users/reset_password", UserForgotPasswordLive, :new
      live "/users/reset_password/:token", UserResetPasswordLive, :edit
    end

    post "/users/log_in", UserSessionController, :create
  end

  scope "/", NheindevWeb do
    pipe_through [:browser, :require_authenticated_user]

    live_session :require_authenticated_user,
      on_mount: [{NheindevWeb.UserAuth, :ensure_authenticated}] do
      live "/users/settings", UserSettingsLive, :edit
      live "/users/settings/confirm_email/:token", UserSettingsLive, :confirm_email
    end
  end

  scope "/", NheindevWeb do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete

    live_session :current_user,
      on_mount: [{NheindevWeb.UserAuth, :mount_current_user}] do
      live "/users/confirm/:token", UserConfirmationLive, :edit
      live "/users/confirm", UserConfirmationInstructionsLive, :new
    end
  end
end

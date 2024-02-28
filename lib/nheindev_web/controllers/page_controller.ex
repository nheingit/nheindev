defmodule NheindevWeb.PageController do
  use NheindevWeb, :controller
  import Ecto.Query
  alias Nheindev.Repo
  alias Nheindev.Blog.Post

  def home(conn, _params) do
    posts_query = from p in Post, limit: 3, where: p.is_published == true
    posts = Repo.all(posts_query)
    render(conn, :home, posts: posts, layout: false)
  end

  def posts(conn, _params) do
    posts_query = from p in Post, where: p.is_published == true
    posts = Repo.all(posts_query)
    render(conn, :posts, posts: posts, layout: false)
  end

  def hire(conn, _params) do
    render(conn, :hire, page_title: "hire")
  end

  def contact(conn, _params) do
    render(conn, :contact, page_title: "contact me")
  end

  def submit_contact_form(conn, %{"contact" => contact_params}) do
    # Here you would handle the form data, e.g., sending an email or saving to a database
    IO.inspect(contact_params, label: "Form Data")

    # After handling the form, redirect the user or render something
    conn
    |> put_flash(:info, "Thank you for your inquiry. We will get back to you soon.")
    |> redirect(to: "/")
  end
end

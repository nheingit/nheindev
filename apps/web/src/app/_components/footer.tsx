import Link from 'next/link'
export const Footer: React.FC = () => (
  <footer className="mt-8 text-center py-4 border-t border-gray-200">
    <p className="mb-2">© 2023 Noah's Digital Garden</p>
    <nav>
      <ul className="flex justify-center space-x-4">
        <li>
          <Link className="hover:text-red-500" href="#">
            Garden
          </Link>
        </li>
        <li>
          <Link className="hover:text-red-500" href="#">
            GitHub
          </Link>
        </li>
        <li>
          <p>
            <Link className="hover:text-red-500" href="#">
              <p>Twitter</p>
            </Link>
          </p>
        </li>
      </ul>
    </nav>
  </footer>
)

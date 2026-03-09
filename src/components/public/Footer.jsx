export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-gray-500">
          {'<Portfolio />'} — Built with React + Node
        </p>
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  )
}

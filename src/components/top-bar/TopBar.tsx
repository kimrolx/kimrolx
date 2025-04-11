export default function TopBar() {
  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Experience', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <div className="sticky top-0 z-[1000]">
      <div className="h-full w-full mx-auto bg-white-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <div className="flex items-center justify-center h-16 px-4">
          <ul className="flex space-x-8 text-sm">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-gray-600 transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

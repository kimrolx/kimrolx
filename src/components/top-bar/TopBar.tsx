export default function TopBar() {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href === '#home') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 right-0 left-0 z-[1000]">
      <div className="h-full w-full mx-auto bg-white-100 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <div className="flex items-center justify-center h-16 px-4">
          <ul className="flex space-x-8 text-sm">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="hover:text-gray-600 transition"
                >
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

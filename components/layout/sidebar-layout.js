import { useState, useMemo } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function SidebarLayout({ children }) {
  const [open, setOpen] = useState(false);
  const menuItems = useMemo(() => [
    { name: 'Consult', icon: BookOpen, href: '#' },
  ], []);

  return (
    <div className="flex min-h-screen">
      <aside className={`${open ? 'block' : 'hidden'} md:block w-64 shrink-0 border-r bg-muted/50 p-4`}>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <Link key={item.name} href={item.href}>
              <div className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-2 border-b p-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <h1 className="text-lg font-semibold">Oraculo</h1>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

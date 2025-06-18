import { useState, useMemo, type ReactNode } from 'react'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

interface SidebarLayoutProps {
  children: ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [open, setOpen] = useState(false)
  const menuItems = useMemo(() => [
    { name: 'New Consult', icon: BookOpen, href: '/' },
  ], [])

  return (
    <div className="flex min-h-screen">
      <aside className={`${open ? 'block' : 'hidden'} md:block w-64 shrink-0 border-r bg-muted/50 p-4`}>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <Link key={item.name} href={item.href} className="flex items-center gap-2 rounded-md p-2 hover:bg-accent">
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}

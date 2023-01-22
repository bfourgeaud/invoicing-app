import { notFound } from "next/navigation";

import { SideNav } from "@/components/side-nav";
import { MainNav } from "@/components/top-nav";
import { UserNav } from "@/components/user-nav";
import { navigationConfig } from "@/config/navigation";
import { getCurrentUser } from "@/lib/session";
import { WithChildren } from "types/common";

export default async function ContentLayout({ children }: WithChildren) {
  const user = await getCurrentUser()

  if(!user) {
    return notFound()
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={navigationConfig.topNav} />
          <UserNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SideNav items={navigationConfig.sideNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
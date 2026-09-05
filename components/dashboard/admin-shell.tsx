"use client";

import NextLink from "next/link";
import {
  LinkProvider,
  Sidebar,
  type LinkComponentProps,
} from "@cloudflare/kumo";
import { ChatTextIcon, HouseIcon, UserCheckIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { forwardRef, type ReactNode } from "react";

const AppLink = forwardRef<HTMLAnchorElement, LinkComponentProps>(
  ({ href = "#", ...props }, ref) => (
    <NextLink ref={ref} href={href} {...props} />
  ),
);
AppLink.displayName = "AppLink";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <LinkProvider component={AppLink}>
      <Sidebar.Provider defaultOpen className="h-dvh min-h-dvh overflow-hidden">
        <Sidebar className="h-full">
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
              <Sidebar.Menu>
                <Sidebar.MenuButton icon={HouseIcon} active={pathname === "/dashboard"} href="/dashboard">
                  Overview
                </Sidebar.MenuButton>
                <Sidebar.MenuButton icon={UserCheckIcon} active={pathname === "/dashboard/rsvp"} href="/dashboard/rsvp">
                  RSVP
                </Sidebar.MenuButton>
                <Sidebar.MenuButton icon={ChatTextIcon} active={pathname === "/dashboard/notes"} href="/dashboard/notes">
                  Notes
                </Sidebar.MenuButton>
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Sidebar.Trigger />
          </Sidebar.Footer>
        </Sidebar>
        <div className="min-w-0 flex-1 overflow-y-auto">{children}</div>
      </Sidebar.Provider>
    </LinkProvider>
  );
}

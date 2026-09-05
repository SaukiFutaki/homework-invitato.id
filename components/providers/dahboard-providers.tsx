import { Sidebar } from "@cloudflare/kumo";
import { HouseIcon, CodeIcon, GearIcon } from "@phosphor-icons/react";

function AppLayout({ children } : { children: React.ReactNode }) {
  return (
    <Sidebar.Provider defaultOpen>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuButton icon={HouseIcon} active>
                Home
              </Sidebar.MenuButton>
              {/* MenuItem only needed to wrap Collapsible */}
              <Sidebar.MenuItem>
                <Sidebar.Collapsible>
                  <Sidebar.CollapsibleTrigger
                    render={
                      <Sidebar.MenuButton icon={CodeIcon}>
                        Compute <Sidebar.MenuChevron />
                      </Sidebar.MenuButton>
                    }
                  />
                  <Sidebar.CollapsibleContent>
                    <Sidebar.MenuSub>
                      <Sidebar.MenuSubButton>Workers</Sidebar.MenuSubButton>
                    </Sidebar.MenuSub>
                  </Sidebar.CollapsibleContent>
                </Sidebar.Collapsible>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Trigger />
        </Sidebar.Footer>
      </Sidebar>
      <div className="flex-1">{children}</div>
    </Sidebar.Provider>
  );
}

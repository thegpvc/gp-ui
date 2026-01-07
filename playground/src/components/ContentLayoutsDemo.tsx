import { useState } from "react";
import {
  ContentArea,
  ContentTabs,
  ContentSidebar,
  ContentPane,
  ContentBody,
  Card,
  Button,
  Alert,
} from "@gp/ui";
import { FileText, Settings, Users, Home, BarChart3 } from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

const sidebarItems = [
  { id: "intro", label: "Introduction", icon: <Home className="w-4 h-4" /> },
  { id: "guide", label: "User Guide", icon: <FileText className="w-4 h-4" /> },
  { id: "api", label: "API Reference", icon: <Settings className="w-4 h-4" /> },
  { id: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
];

export function ContentLayoutsDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("intro");
  const [demoType, setDemoType] = useState<
    "tabs" | "sidebar" | "tabs-sidebar" | "fullwidth"
  >("tabs");

  return (
    <div className="space-y-8">
      <Alert variant="info">
        The Content primitives fill the Layout content area with common
        patterns. Select a demo below to see each pattern.
      </Alert>

      {/* Demo selector */}
      <section className="demo-section">
        <h2 className="demo-section-title">Select Pattern</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={demoType === "tabs" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("tabs")}
          >
            Tabs + Content
          </Button>
          <Button
            variant={demoType === "sidebar" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("sidebar")}
          >
            Secondary Sidebar
          </Button>
          <Button
            variant={demoType === "tabs-sidebar" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("tabs-sidebar")}
          >
            Tabs + Sidebar
          </Button>
          <Button
            variant={demoType === "fullwidth" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("fullwidth")}
          >
            Full-Width Canvas
          </Button>
        </div>
      </section>

      {/* Demo container */}
      <section className="demo-section">
        <h2 className="demo-section-title">
          {demoType === "tabs" && "Tabs + Centered Content"}
          {demoType === "sidebar" && "Secondary Sidebar + Content"}
          {demoType === "tabs-sidebar" && "Tabs + Sidebar Combined"}
          {demoType === "fullwidth" && "Full-Width Canvas"}
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden h-[400px]">
          {demoType === "tabs" && (
            <ContentArea>
              <ContentTabs
                tabs={tabs}
                activeId={activeTab}
                onChange={setActiveTab}
              />
              <ContentPane maxWidth="medium">
                <Card>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-navy-600 text-sm">
                    This is the {activeTab} tab content. The tabs are sticky and
                    the content is centered with a max-width constraint.
                  </p>
                </Card>
              </ContentPane>
            </ContentArea>
          )}

          {demoType === "sidebar" && (
            <ContentArea>
              <ContentBody>
                <ContentSidebar width="narrow">
                  <nav className="p-3 space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSidebarItem(item.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          activeSidebarItem === item.id
                            ? "bg-orange-100 text-orange-700"
                            : "text-navy-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </ContentSidebar>
                <ContentPane maxWidth="wide">
                  <Card>
                    <h3 className="font-semibold text-navy-900 mb-2">
                      {
                        sidebarItems.find((i) => i.id === activeSidebarItem)
                          ?.label
                      }
                    </h3>
                    <p className="text-navy-600 text-sm">
                      Secondary sidebar content. On mobile, tap the menu icon in
                      the header to open the sidebar as a drawer.
                    </p>
                  </Card>
                </ContentPane>
              </ContentBody>
            </ContentArea>
          )}

          {demoType === "tabs-sidebar" && (
            <ContentArea>
              <ContentTabs
                tabs={tabs}
                activeId={activeTab}
                onChange={setActiveTab}
              />
              <ContentBody>
                <ContentSidebar width="narrow">
                  <nav className="p-3 space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSidebarItem(item.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          activeSidebarItem === item.id
                            ? "bg-orange-100 text-orange-700"
                            : "text-navy-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </ContentSidebar>
                <ContentPane>
                  <Card>
                    <h3 className="font-semibold text-navy-900 mb-2">
                      {tabs.find((t) => t.id === activeTab)?.label} /{" "}
                      {
                        sidebarItems.find((i) => i.id === activeSidebarItem)
                          ?.label
                      }
                    </h3>
                    <p className="text-navy-600 text-sm">
                      Combined tabs and sidebar. The sidebar trigger appears in
                      the tab bar on mobile.
                    </p>
                  </Card>
                </ContentPane>
              </ContentBody>
            </ContentArea>
          )}

          {demoType === "fullwidth" && (
            <ContentArea>
              <ContentPane fullWidth padding={false}>
                <div className="h-full bg-gradient-to-br from-navy-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-navy-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-navy-900 mb-1">
                      Dashboard Canvas
                    </h3>
                    <p className="text-navy-600 text-sm">
                      Full-width, edge-to-edge content area
                    </p>
                  </div>
                </div>
              </ContentPane>
            </ContentArea>
          )}
        </div>
      </section>

      {/* Usage code */}
      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">
          {demoType === "tabs" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentTabs
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'settings', label: 'Settings' },
      ]}
      activeId={activeTab}
      onChange={setActiveTab}
    />
    <ContentPane maxWidth="medium">
      <Outlet />
    </ContentPane>
  </ContentArea>
</Layout>`}
          {demoType === "sidebar" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentBody>
      <ContentSidebar width="narrow">
        <TableOfContents />
      </ContentSidebar>
      <ContentPane maxWidth="wide">
        <Article />
      </ContentPane>
    </ContentBody>
  </ContentArea>
</Layout>`}
          {demoType === "tabs-sidebar" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentTabs tabs={tabs} activeId={id} onChange={setId} />
    <ContentBody>
      <ContentSidebar>
        <SettingsNav />
      </ContentSidebar>
      <ContentPane>
        <Outlet />
      </ContentPane>
    </ContentBody>
  </ContentArea>
</Layout>`}
          {demoType === "fullwidth" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentPane fullWidth padding={false}>
      <DashboardGrid />
    </ContentPane>
  </ContentArea>
</Layout>`}
        </pre>
      </section>
    </div>
  );
}

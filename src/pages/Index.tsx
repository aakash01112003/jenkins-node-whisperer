import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Activity, 
  Shield, 
  Cpu, 
  Network, 
  Play,
  Pause,
  Settings,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { NodeCard } from "@/components/NodeCard";
import { JobDistribution } from "@/components/JobDistribution";
import { SecurityPanel } from "@/components/SecurityPanel";
import { ArchitectureManager } from "@/components/ArchitectureManager";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const mockNodes = [
    {
      id: "node-001",
      name: "Ubuntu Build Server",
      status: "online" as const,
      architecture: "linux-x64",
      jobs: 3,
      maxJobs: 8,
      cpu: 45,
      memory: 62,
      lastSeen: "2 minutes ago"
    },
    {
      id: "node-002", 
      name: "Windows Agent",
      status: "busy" as const,
      architecture: "windows-x64",
      jobs: 5,
      maxJobs: 5,
      cpu: 89,
      memory: 78,
      lastSeen: "1 minute ago"
    },
    {
      id: "node-003",
      name: "macOS Builder",
      status: "offline" as const,
      architecture: "darwin-arm64",
      jobs: 0,
      maxJobs: 4,
      cpu: 0,
      memory: 0,
      lastSeen: "1 hour ago"
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">
              2 online, 1 offline
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">8</div>
            <p className="text-xs text-muted-foreground">
              3 queued
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">67%</div>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">Secure</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All nodes isolated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Node Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockNodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>

      {/* Job Distribution */}
      <JobDistribution />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Network className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Jenkins Remoting</h1>
                <p className="text-sm text-muted-foreground">
                  Distributed build management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Node
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: Activity },
              { id: "security", label: "Security", icon: Shield },
              { id: "architecture", label: "Architecture", icon: Cpu }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {selectedTab === "dashboard" && renderDashboard()}
        {selectedTab === "security" && <SecurityPanel />}
        {selectedTab === "architecture" && <ArchitectureManager />}
      </main>
    </div>
  );
};

export default Index;
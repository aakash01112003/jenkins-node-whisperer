import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  Monitor,
  Smartphone,
  Server,
  Plus,
  Settings,
  TrendingUp,
  Activity
} from "lucide-react";

export const ArchitectureManager = () => {
  const architectures = [
    {
      name: "Linux x64",
      identifier: "linux-x64",
      nodes: 2,
      activeJobs: 5,
      totalCapacity: 16,
      usage: 65,
      icon: Server,
      color: "success",
      popular: true
    },
    {
      name: "Windows x64", 
      identifier: "windows-x64",
      nodes: 1,
      activeJobs: 3,
      totalCapacity: 8,
      usage: 89,
      icon: Monitor,
      color: "warning",
      popular: false
    },
    {
      name: "macOS ARM64",
      identifier: "darwin-arm64", 
      nodes: 1,
      activeJobs: 0,
      totalCapacity: 4,
      usage: 0,
      icon: Smartphone,
      color: "destructive",
      popular: false
    },
    {
      name: "Linux ARM64",
      identifier: "linux-arm64",
      nodes: 0,
      activeJobs: 0,
      totalCapacity: 0,
      usage: 0,
      icon: Cpu,
      color: "secondary",
      popular: false
    }
  ];

  const jobTemplates = [
    {
      name: "Frontend Build",
      architectures: ["linux-x64", "windows-x64", "darwin-arm64"],
      frequency: "High",
      avgDuration: "4m 30s"
    },
    {
      name: "Backend API Tests",
      architectures: ["linux-x64", "windows-x64"],
      frequency: "Medium", 
      avgDuration: "8m 15s"
    },
    {
      name: "Mobile App Build",
      architectures: ["darwin-arm64"],
      frequency: "Low",
      avgDuration: "12m 45s"
    },
    {
      name: "Docker Images",
      architectures: ["linux-x64", "linux-arm64"],
      frequency: "Medium",
      avgDuration: "6m 20s"
    }
  ];

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return "destructive";
    if (usage >= 60) return "warning";
    return "success";
  };

  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {architectures.map((arch, index) => (
          <Card key={index} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <arch.icon className="h-5 w-5 text-muted-foreground" />
                {arch.popular && (
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
              <CardTitle className="text-sm">{arch.name}</CardTitle>
              <p className="text-xs text-muted-foreground font-mono">{arch.identifier}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nodes</span>
                <span className="font-medium">{arch.nodes}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Jobs</span>
                <span className="font-medium">{arch.activeJobs}/{arch.totalCapacity}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Usage</span>
                  <span className="font-medium">{arch.usage}%</span>
                </div>
                <Progress 
                  value={arch.usage} 
                  className="h-2"
                />
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Plus className="h-3 w-3 mr-1" />
                Add Node
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Templates by Architecture */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Job Templates by Architecture</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Manage Templates
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobTemplates.map((template, index) => (
              <div 
                key={index}
                className="p-4 bg-background/50 rounded-lg border border-border/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{template.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Frequency: {template.frequency}</span>
                      <span>Avg Duration: {template.avgDuration}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Activity className="h-3 w-3" />
                    <span>{template.architectures.length} archs</span>
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {template.architectures.map((archId) => {
                    const arch = architectures.find(a => a.identifier === archId);
                    return (
                      <Badge 
                        key={archId}
                        variant="secondary"
                        className="text-xs font-mono"
                      >
                        {archId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Architecture Performance */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Architecture Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Fastest Builds</h4>
              <div className="space-y-2">
                {[
                  { arch: "linux-x64", time: "3m 42s" },
                  { arch: "windows-x64", time: "4m 15s" },
                  { arch: "darwin-arm64", time: "5m 30s" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-mono text-muted-foreground">{item.arch}</span>
                    <span className="font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Success Rates</h4>
              <div className="space-y-2">
                {[
                  { arch: "linux-x64", rate: "98.5%" },
                  { arch: "windows-x64", rate: "94.2%" },
                  { arch: "darwin-arm64", rate: "92.1%" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-mono text-muted-foreground">{item.arch}</span>
                    <span className="font-medium text-success">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Resource Usage</h4>
              <div className="space-y-2">
                {[
                  { arch: "linux-x64", usage: "65%" },
                  { arch: "windows-x64", usage: "89%" },
                  { arch: "darwin-arm64", usage: "0%" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-mono text-muted-foreground">{item.arch}</span>
                    <span className={`font-medium ${getUsageColor(parseInt(item.usage)) === 'success' ? 'text-success' : 
                      getUsageColor(parseInt(item.usage)) === 'warning' ? 'text-warning' : 'text-destructive'}`}>
                      {item.usage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
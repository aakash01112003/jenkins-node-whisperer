import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp
} from "lucide-react";

export const JobDistribution = () => {
  const jobs = [
    {
      id: "job-1",
      name: "Frontend Build",
      node: "Ubuntu Build Server",
      status: "running",
      progress: 65,
      duration: "3m 42s",
      architecture: "linux-x64"
    },
    {
      id: "job-2", 
      name: "Backend Tests",
      node: "Windows Agent",
      status: "running",
      progress: 89,
      duration: "8m 15s",
      architecture: "windows-x64"
    },
    {
      id: "job-3",
      name: "Docker Build",
      node: "Ubuntu Build Server",
      status: "queued",
      progress: 0,
      duration: "Waiting...",
      architecture: "linux-x64"
    },
    {
      id: "job-4",
      name: "iOS Build",
      node: "macOS Builder",
      status: "failed",
      progress: 100,
      duration: "Failed at 2m 30s",
      architecture: "darwin-arm64"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "info";
      case "queued":
        return "warning";
      case "completed":
        return "success";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Activity className="h-4 w-4" />;
      case "queued":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "failed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Job Distribution</CardTitle>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>Real-time</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="p-4 bg-background/50 rounded-lg border border-border/50 hover:bg-background/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={getStatusColor(job.status) as any}
                    className="flex items-center space-x-1"
                  >
                    {getStatusIcon(job.status)}
                    <span className="capitalize">{job.status}</span>
                  </Badge>
                  <h4 className="font-medium text-foreground">{job.name}</h4>
                </div>
                <span className="text-sm text-muted-foreground">{job.duration}</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Node: {job.node} ({job.architecture})
                </span>
                <span className="text-sm font-medium">{job.progress}%</span>
              </div>
              
              <Progress value={job.progress} className="h-2" />
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-info">2</div>
              <div className="text-xs text-muted-foreground">Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">1</div>
              <div className="text-xs text-muted-foreground">Queued</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">1</div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
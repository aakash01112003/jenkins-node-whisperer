import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Cpu, 
  MemoryStick, 
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  Clock,
  Terminal
} from "lucide-react";

interface Node {
  id: string;
  name: string;
  status: "online" | "offline" | "busy";
  architecture: string;
  jobs: number;
  maxJobs: number;
  cpu: number;
  memory: number;
  lastSeen: string;
}

interface NodeCardProps {
  node: Node;
}

export const NodeCard = ({ node }: NodeCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "success";
      case "busy":
        return "warning";
      case "offline":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4" />;
      case "busy":
        return <AlertTriangle className="h-4 w-4" />;
      case "offline":
        return <Clock className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">{node.name}</CardTitle>
          </div>
          <Badge 
            variant={getStatusColor(node.status) as any}
            className="flex items-center space-x-1"
          >
            {getStatusIcon(node.status)}
            <span className="capitalize">{node.status}</span>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{node.architecture}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Job Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Jobs</span>
            <span className="font-medium">{node.jobs}/{node.maxJobs}</span>
          </div>
          <Progress value={(node.jobs / node.maxJobs) * 100} className="h-2" />
        </div>

        {/* Resource Usage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Cpu className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">CPU</span>
            </div>
            <div className="text-sm font-medium">{node.cpu}%</div>
            <Progress value={node.cpu} className="h-1" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <MemoryStick className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Memory</span>
            </div>
            <div className="text-sm font-medium">{node.memory}%</div>
            <Progress value={node.memory} className="h-1" />
          </div>
        </div>

        {/* Last Seen */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last seen: {node.lastSeen}</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Terminal className="h-3 w-3 mr-1" />
            Connect
          </Button>
          {node.status === "online" ? (
            <Button size="sm" variant="outline">
              <Pause className="h-3 w-3" />
            </Button>
          ) : (
            <Button size="sm" variant="outline">
              <Play className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
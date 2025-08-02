import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Lock, 
  Key, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Network,
  Eye,
  EyeOff
} from "lucide-react";

export const SecurityPanel = () => {
  const securityMetrics = [
    {
      title: "Node Isolation",
      status: "active",
      description: "All nodes run in isolated environments",
      icon: Shield,
      enabled: true
    },
    {
      title: "TLS Encryption",
      status: "active", 
      description: "All communication encrypted with TLS 1.3",
      icon: Lock,
      enabled: true
    },
    {
      title: "Certificate Auth",
      status: "active",
      description: "X.509 certificates for node authentication",
      icon: Key,
      enabled: true
    },
    {
      title: "Network Segmentation",
      status: "warning",
      description: "Some nodes on same subnet",
      icon: Network,
      enabled: false
    }
  ];

  const vulnerabilities = [
    {
      id: "vuln-1",
      severity: "medium",
      title: "Outdated Agent Version",
      node: "Windows Agent",
      description: "Agent version 2.401 has known vulnerabilities",
      recommendation: "Update to version 2.414 or later"
    },
    {
      id: "vuln-2",
      severity: "low",
      title: "Weak Password Policy",
      node: "All Nodes",
      description: "Password complexity requirements not enforced",
      recommendation: "Enable strong password policy"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-card border-border shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <metric.icon className="h-5 w-5 text-muted-foreground" />
                <Switch checked={metric.enabled} />
              </div>
              <CardTitle className="text-sm">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                {metric.status === "active" ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <Badge 
                  variant={metric.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {metric.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Vulnerabilities */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Security Vulnerabilities</CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Scan Settings
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div 
                key={vuln.id}
                className="p-4 bg-background/50 rounded-lg border border-border/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant={getSeverityColor(vuln.severity) as any}
                        className="text-xs"
                      >
                        {vuln.severity.toUpperCase()}
                      </Badge>
                      <h4 className="font-medium text-foreground">{vuln.title}</h4>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Node:</strong> {vuln.node}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                    <p className="text-sm text-info">
                      <strong>Recommendation:</strong> {vuln.recommendation}
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Fix Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Policies */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Security Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Require Agent Authentication",
                description: "All agents must authenticate before connecting",
                enabled: true
              },
              {
                title: "Audit Logging",
                description: "Log all security-related events",
                enabled: true
              },
              {
                title: "Network Access Control",
                description: "Restrict agent network access to Jenkins only",
                enabled: false
              },
              {
                title: "Regular Security Scans",
                description: "Automatically scan nodes for vulnerabilities",
                enabled: true
              }
            ].map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">{policy.title}</h4>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                </div>
                <Switch checked={policy.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
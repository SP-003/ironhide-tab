import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, EyeOff, Keyboard, Info, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [opacity, setOpacity] = useState([100]);
  const { toast } = useToast();

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
        event.preventDefault();
        setIsEnabled(prev => !prev);
        toast({
          title: "IronHide Toggled",
          description: `Privacy mode ${!isEnabled ? 'enabled' : 'disabled'}`,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, toast]);

  // Apply opacity effect to the demo content
  const contentStyle = {
    opacity: isEnabled ? opacity[0] / 100 : 1, // Convert percentage to 0-1 range
    transition: 'opacity 0.3s ease-in-out'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                IronHide
              </CardTitle>
            </div>
            <CardDescription className="text-lg">
              Chrome Extension for Tab Opacity Control & Privacy
            </CardDescription>
            <Badge variant="secondary" className="w-fit mx-auto">
              Demo Version
            </Badge>
          </CardHeader>
        </Card>

        {/* Main Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy Controls
            </CardTitle>
            <CardDescription>
              Toggle opacity control and adjust visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Toggle Button */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Enable Privacy Mode</p>
                <p className="text-sm text-muted-foreground">
                  Activate opacity control for the current tab
                </p>
              </div>
              <Button
                variant={isEnabled ? "default" : "outline"}
                size="lg"
                onClick={() => setIsEnabled(!isEnabled)}
                className="flex items-center gap-2"
              >
                {isEnabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {isEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>

            <Separator />

            {/* Opacity Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Opacity Level</p>
                <Badge variant="outline">{opacity[0]}%</Badge>
              </div>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                max={100}
                min={0}
                step={10}
                disabled={!isEnabled}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0% (Invisible)</span>
                <span>100% (Fully Visible)</span>
              </div>
            </div>

            {/* Keyboard Shortcut */}
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Keyboard className="h-4 w-4 text-primary" />
              <span className="text-sm">
                Press <kbd className="px-2 py-1 bg-background rounded border">Ctrl+Shift+Z</kbd> to toggle
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Demo Content with Applied Effect */}
        <div style={contentStyle}>
          <Card>
            <CardHeader>
              <CardTitle>Demo Content</CardTitle>
              <CardDescription>
                This content demonstrates the opacity effect when privacy mode is enabled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Sample Text</h3>
                  <p className="text-muted-foreground">
                    This is some sensitive content that you might want to hide from prying eyes.
                    When IronHide is enabled, this text becomes harder to read.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Privacy Benefits</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Protect sensitive information</li>
                    <li>• Maintain privacy in public spaces</li>
                    <li>• Quick toggle with keyboard shortcut</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About IronHide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              IronHide is a Chrome extension designed to give you instant privacy control over your browser tabs.
              By adjusting the opacity of web page content, you can quickly obscure sensitive information when
              working in public spaces or shared environments.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Adjustable opacity from 0-100%</li>
                  <li>• Quick toggle button</li>
                  <li>• Keyboard shortcut support</li>
                  <li>• Per-tab control</li>
                  <li>• Instant activation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Use Cases</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Working in public spaces</li>
                  <li>• Screen sharing privacy</li>
                  <li>• Sensitive document viewing</li>
                  <li>• Shared computer usage</li>
                  <li>• Presentation privacy</li>
                </ul>
              </div>
            </div>
            <Separator />
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Contact & Support</h4>
              <p className="text-sm text-muted-foreground">
                For questions, feedback, or support contact: <strong>saymyname355601@gmail.com</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              How to Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex gap-3">
                <Badge className="shrink-0">1</Badge>
                <div>
                  <p className="font-medium">Install the Extension</p>
                  <p className="text-sm text-muted-foreground">
                    Add IronHide to your Chrome browser from the Chrome Web Store
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge className="shrink-0">2</Badge>
                <div>
                  <p className="font-medium">Access the Controls</p>
                  <p className="text-sm text-muted-foreground">
                    Click the IronHide icon in your browser toolbar or use the keyboard shortcut
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge className="shrink-0">3</Badge>
                <div>
                  <p className="font-medium">Toggle Privacy Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Enable privacy mode and adjust the opacity slider to your preferred level
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge className="shrink-0">4</Badge>
                <div>
                  <p className="font-medium">Quick Access</p>
                  <p className="text-sm text-muted-foreground">
                    Use <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+Shift+Z</kbd> for instant toggle
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

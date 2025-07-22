import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileSectionProps {
  collapsed: boolean;
}

const ProfileSection = ({ collapsed }: ProfileSectionProps) => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-10 w-10 bg-muted rounded-full"></div>
          {!collapsed && (
            <div className="mt-2 space-y-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground">
                Not signed in
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="space-y-2">
            <Link to="/auth" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/auth" className="w-full">
              <Button size="sm" className="w-full gradient-primary">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }

  const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';
  const email = user.email;
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="gradient-primary text-white font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {email}
            </p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Free Plan
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              title="Settings"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="h-3 w-3 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
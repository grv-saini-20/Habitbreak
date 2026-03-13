import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AuthLayout({ title, children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">

      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {children}
        </CardContent>

      </Card>

    </div>
  );
}

export default AuthLayout;
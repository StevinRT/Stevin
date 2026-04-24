import { useState } from "react";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setBusy(true);
    setError("");
    try {
      await login(password);
    } catch (err) {
      const detail = err?.response?.data?.detail || err.message || "Login failed";
      setError(typeof detail === "string" ? detail : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4" data-testid="admin-login">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl bg-card border border-border card-shadow p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-xl font-semibold">Admin access</div>
            <div className="text-xs text-muted-foreground font-sub">PJ Ours dashboard</div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="admin-pwd" className="font-sub text-xs">Password</Label>
          <Input
            id="admin-pwd"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="rounded-xl h-11"
            data-testid="admin-password-input"
          />
          {error && (
            <p className="text-xs text-destructive flex items-center gap-1" data-testid="admin-login-error">
              <AlertCircle className="h-3 w-3" /> {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sub font-semibold"
          data-testid="admin-login-submit"
        >
          <LogIn className="h-4 w-4 mr-2" />
          {busy ? "Signing in…" : "Sign in"}
        </Button>

        <p className="mt-5 text-[11px] text-muted-foreground text-center font-sub">
          Only the café owner / manager should access this.
        </p>
      </form>
    </div>
  );
}

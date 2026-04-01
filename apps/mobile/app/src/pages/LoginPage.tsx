import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign in to your RIDE account</p>

      <div className="mt-10 flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
          <input
            type="email"
            placeholder="rider@email.com"
            className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 w-full rounded-lg border border-divider bg-surface px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              {showPw ? <EyeOff size={18} className="text-muted-foreground" /> : <Eye size={18} className="text-muted-foreground" />}
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-2 h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground active:opacity-90"
        >
          Sign In
        </button>

        <div className="relative my-4 flex items-center">
          <div className="flex-1 border-t border-divider" />
          <span className="px-4 text-xs text-muted-foreground">or</span>
          <div className="flex-1 border-t border-divider" />
        </div>

        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-foreground/20 text-sm font-semibold text-foreground active:bg-surface">
          Sign in with Google
        </button>
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-foreground/20 text-sm font-semibold text-foreground active:bg-surface">
          Sign in with Apple
        </button>
      </div>

      <div className="mt-auto pb-8 pt-6 text-center">
        <span className="text-sm text-muted-foreground">Don't have an account? </span>
        <button onClick={() => navigate("/register")} className="text-sm font-semibold text-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

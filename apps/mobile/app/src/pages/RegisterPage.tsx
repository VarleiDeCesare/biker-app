import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pt-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Set up your rider profile</p>

      <div className="mt-10 flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
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
          <input
            type="password"
            placeholder="••••••••"
            className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="mt-2 border-t border-divider pt-6">
          <p className="text-sm font-semibold text-foreground">Rider Profile</p>
          <p className="mb-4 text-xs text-muted-foreground">Tell us about your riding experience</p>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Years Riding</label>
              <input
                type="number"
                placeholder="e.g. 5"
                className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Preferred Bike Type</label>
              <select className="h-12 w-full rounded-lg border border-divider bg-surface px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Select type</option>
                <option>Sport</option>
                <option>Naked</option>
                <option>Adventure</option>
                <option>Cruiser</option>
                <option>Touring</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 h-14 w-full rounded-xl bg-primary text-base font-bold text-primary-foreground active:opacity-90"
        >
          Create Account
        </button>
      </div>

      <div className="mt-auto pb-8 pt-6 text-center">
        <span className="text-sm text-muted-foreground">Already have an account? </span>
        <button onClick={() => navigate("/login")} className="text-sm font-semibold text-primary">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

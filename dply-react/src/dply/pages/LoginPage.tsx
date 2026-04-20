import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/button";
import Input from "components/input";
import Typography from "components/typography";
import { login } from "../grpc/services";
import { useAppDispatch } from "../store";
import { setAuth } from "../store/authSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      dispatch(setAuth(user));
      navigate("/projects");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background p-4">
      <form className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-4 space-y-1">
          <Typography variant="heading4" weight="bold">dply Web</Typography>
          <Typography variant="body" tone="secondary">Login with your dply account</Typography>
        </div>

        <div className="space-y-2">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
          />
        </div>

        {error ? (
          <Typography className="mt-2 rounded-lg border border-error-200 bg-error-100 p-2" variant="body" tone="error">
            {error}
          </Typography>
        ) : null}

        <div className="mt-4">
          <Button type="submit" isFullSize disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;

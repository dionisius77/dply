import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "components/button";
import Typography from "components/typography";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import ImagesPage from "./pages/images/ImagesPage";
import SpecPage from "./pages/spec/SpecPage";
import DeployPage from "./pages/DeployPage";
import { useAppDispatch, useAppSelector } from "./store";
import { clearAuth, setAuth } from "./store/authSlice";
import { getCurrentLogin, getServerStatus } from "./grpc/services";

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-lg px-3 py-2 text-sm font-semibold transition",
    isActive
      ? "bg-primary-100 text-primary-600"
      : "text-text-secondary hover:bg-whiteScale-80 hover:text-text-primary",
  ].join(" ");

const Shell = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const activeProject = useAppSelector((state) => state.workspace.activeProject);

  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const serverStatus = await getServerStatus();
        setStatus(serverStatus);
      } catch {
        setStatus("unavailable");
      }
    };

    void loadStatus();
  }, []);

  useEffect(() => {
    if (!token) return;

    const hydrateUser = async () => {
      try {
        const current = await getCurrentLogin(token);
        dispatch(setAuth(current));
      } catch {
        dispatch(clearAuth());
        navigate("/login");
      }
    };

    void hydrateUser();
  }, [token, dispatch, navigate]);

  return (
    <main className="min-h-screen bg-background p-4 md:p-6">
      <header className="mb-4 flex flex-col gap-4 rounded-xl border border-border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Typography variant="heading4" weight="bold">dply Web</Typography>
          <Typography variant="body" tone="secondary">
            Server: <b>{status}</b> | Active Project: <b>{activeProject}</b>
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          <Typography variant="body" tone="secondary">{user?.email || "unknown"}</Typography>
          <Button
            size="small"
            color="error"
            onClick={() => {
              dispatch(clearAuth());
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="flex gap-2 rounded-xl border border-border bg-white p-3 shadow-sm md:flex-col">
          <NavLink to="/projects" className={navClass}>Projects</NavLink>
          <NavLink to="/deploy" className={navClass}>Deploy</NavLink>
        </aside>

        <section className="min-w-0">
          <Routes>
            <Route path="/projects" element={<ProjectsPage />} />
            {/* <Route path="/images" element={<ImagesPage />} /> */}
            <Route path="/deploy" element={<SpecPage />} />
            {/* <Route path="/deploy" element={<DeployPage />} /> */}
            <Route path="*" element={<Navigate to="/projects" replace />} />
          </Routes>
        </section>
      </div>
    </main>
  );
};

const AppRouter = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/projects" replace /> : <LoginPage />} />
      <Route path="/*" element={token ? <Shell /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;

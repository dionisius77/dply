import { FormEvent, useState } from "react";
import Button from "components/button";
import ContentContainer from "components/container";
import Input from "components/input";
import Typography from "components/typography";
import { deployImage, redeploy } from "../grpc/services";
import { useAppSelector } from "../store";

const DeployPage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const project = useAppSelector((state) => state.workspace.activeProject);

  const [env, setEnv] = useState("");
  const [name, setName] = useState("");
  const [digest, setDigest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const checkScope = () => {
    if (!env || !name) {
      setError("Environment and deployment name are required.");
      return false;
    }
    return true;
  };

  const onDeploy = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!checkScope()) return;
    if (!digest) {
      setError("Digest is required for deploy image.");
      return;
    }

    setLoading(true);
    try {
      await deployImage(token, project, env, name, digest);
      setMessage("Deploy request submitted.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onRedeploy = async () => {
    setError("");
    setMessage("");
    if (!checkScope()) return;

    setLoading(true);
    try {
      await redeploy(token, project, env, name);
      setMessage("Redeploy request submitted.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <Typography variant="heading4" weight="bold">Deploy</Typography>
      <Typography variant="body" tone="secondary">Active project: <b>{project}</b></Typography>

      {error ? (
        <Typography className="rounded-lg border border-error-200 bg-error-100 p-2" variant="body" tone="error">{error}</Typography>
      ) : null}
      {message ? (
        <Typography className="rounded-lg border border-success-200 bg-success-100 p-2" variant="body" tone="secondary">{message}</Typography>
      ) : null}

      <ContentContainer>
        <form className="space-y-3" onSubmit={onDeploy}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input label="Environment" value={env} onChange={(e) => setEnv(e.target.value)} placeholder="namespace" />
            <Input label="Deployment Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
            <Input label="Digest" value={digest} onChange={(e) => setDigest(e.target.value)} placeholder="sha256:..." />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={loading}>Deploy Image</Button>
            <Button type="button" variant="outline" disabled={loading} onClick={onRedeploy}>Redeploy</Button>
          </div>
        </form>
      </ContentContainer>
    </section>
  );
};

export default DeployPage;

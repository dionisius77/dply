import { getSpecBundle, upsertEnvar, upsertScale, upsertPorts, upsertAffinity } from "dply/grpc/services";
import { useAppSelector } from "dply/store";
import { ScaleSpec } from "dply/types";
import { useState, FormEvent } from "react";

const defaultScale = (project: string, env: string, name: string): ScaleSpec => ({
  project,
  env,
  name,
  minReplica: 1,
  maxReplica: 3,
  minCpu: 64,
  maxCpu: 64,
  minMemory: 64,
  maxMemory: 64,
  targetCpu: 70,
});

const useSpec = () => {
  const token = useAppSelector((state) => state.auth.token);
  const project = useAppSelector((state) => state.workspace.activeProject);

  const [env, setEnv] = useState("");
  const [name, setName] = useState("");
  const [variables, setVariables] = useState("{}");
  const [scale, setScale] = useState<ScaleSpec>(defaultScale(project, "", ""));
  const [accessType, setAccessType] = useState("ClusterIP");
  const [externalIP, setExternalIP] = useState("");
  const [portsJson, setPortsJson] = useState('[{"name":"http","port":80,"remotePort":80,"protocol":"TCP"}]');
  const [nodeAffinityJson, setNodeAffinityJson] = useState("[]");
  const [podAffinityJson, setPodAffinityJson] = useState("[]");
  const [podAntiAffinityJson, setPodAntiAffinityJson] = useState("[]");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const ensureScope = (): boolean => {
    if (!env || !name) {
      setError("Environment and deployment name are required.");
      return false;
    }
    return true;
  };

  const onLoad = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!ensureScope()) return;

    setLoading(true);
    try {
      const spec = await getSpecBundle(token, project, env, name);
      setVariables(spec.variables || "{}");
      setScale({ ...spec.scaling, project, env, name });
      setAccessType(spec.ports.accessType || "ClusterIP");
      setExternalIP(spec.ports.externalIP || "");
      setPortsJson(JSON.stringify(spec.ports.ports || [], null, 2));
      setNodeAffinityJson(JSON.stringify(spec.affinity.nodeAffinity || [], null, 2));
      setPodAffinityJson(JSON.stringify(spec.affinity.podAffinity || [], null, 2));
      setPodAntiAffinityJson(JSON.stringify(spec.affinity.podAntiAffinity || [], null, 2));
      setMessage("Specification loaded.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const saveEnvar = async () => {
    setError("");
    setMessage("");
    if (!ensureScope()) return;

    try {
      JSON.parse(variables);
      await upsertEnvar(token, project, env, name, variables);
      setMessage("Environment variables saved.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const saveScale = async () => {
    setError("");
    setMessage("");
    if (!ensureScope()) return;

    const payload = { ...scale, project, env, name };
    if (payload.minReplica < 1 || payload.maxReplica < 1 || payload.targetCpu < 1 || payload.targetCpu > 100) {
      setError("Scaling values are out of range.");
      return;
    }

    try {
      await upsertScale(token, payload);
      setMessage("Scaling saved.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const savePorts = async () => {
    setError("");
    setMessage("");
    if (!ensureScope()) return;

    try {
      const ports = JSON.parse(portsJson);
      await upsertPorts(token, project, env, name, accessType, externalIP, ports);
      setMessage("Ports saved.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const saveAffinity = async () => {
    setError("");
    setMessage("");
    if (!ensureScope()) return;

    try {
      await upsertAffinity(token, project, env, name, {
        nodeAffinity: JSON.parse(nodeAffinityJson),
        podAffinity: JSON.parse(podAffinityJson),
        podAntiAffinity: JSON.parse(podAntiAffinityJson),
      });
      setMessage("Affinity saved.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    project,
    error,
    message,
    env,
    setEnv,
    name,
    setName,
    loading,
    onLoad,
    variables,
    setVariables,
    saveEnvar,
    scale,
    setScale,
    accessType,
    setAccessType,
    externalIP,
    setExternalIP,
    portsJson,
    setPortsJson,
    savePorts,
    saveScale,
    nodeAffinityJson,
    setNodeAffinityJson,
    podAffinityJson,
    setPodAffinityJson,
    podAntiAffinityJson,
    setPodAntiAffinityJson,
    saveAffinity,
  }
}

export default useSpec;
import { FormEvent, useState } from "react";
import Button from "components/button";
import ContentContainer from "components/container";
import Input, { Textarea } from "components/input";
import Select from "components/select";
import Typography from "components/typography";
import { getSpecBundle, upsertAffinity, upsertEnvar, upsertPorts, upsertScale } from "../../grpc/services";
import { useAppSelector } from "../../store";
import { ScaleSpec } from "../../types";
import useSpec from "./hooks/useSpec";
import ImagesSection from "./sections/images.section";

const ScopeFields = ({
  env,
  setEnv,
  name,
  setName,
  loading,
  onLoad,
}: {
  env: string;
  setEnv: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  loading: boolean;
  onLoad: (event: FormEvent) => void;
}) => (
  <form className="flex flex-wrap items-center gap-3" onSubmit={onLoad}>
    <div className="max-w-[500px]">
      <Select
        label="Environment"
        value={env}
        onValueChange={(value) => setEnv(Array.isArray(value) ? value[0] : value)}
        options={[
          { label: "Development", value: "development" },
          { label: "Staging", value: "staging" },
          { label: "Production", value: "production" },
        ]}
      />
    </div>
    <Input label="Service Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="service name" parentClassName="max-w-[260px]" />
    <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Load"}</Button>
  </form>
);

const SpecPage = () => {
  const {
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
  } = useSpec();

  return (
    <section className="space-y-4">
      <Typography variant="heading4" weight="bold">Specification</Typography>
      <Typography variant="body" tone="secondary">Active project: <b>{project}</b></Typography>

      {error ? (
        <Typography className="rounded-lg border border-error-200 bg-error-100 p-2" variant="body" tone="error">{error}</Typography>
      ) : null}
      {message ? (
        <Typography className="rounded-lg border border-success-200 bg-success-100 p-2" variant="body" tone="secondary">{message}</Typography>
      ) : null}

      <ContentContainer>
        <ScopeFields env={env} setEnv={setEnv} name={name} setName={setName} loading={loading} onLoad={onLoad} />
      </ContentContainer>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ContentContainer>
          <div className="space-y-3">
            <Typography variant="heading6" weight="bold">Environment Variables</Typography>
            <Textarea value={variables} onChange={(e) => setVariables(e.target.value)} rows={12} />
            <Button onClick={saveEnvar}>Save Envar</Button>
          </div>
        </ContentContainer>

        <ContentContainer>
          <div className="space-y-3">
            <Typography variant="heading6" weight="bold">Scaling</Typography>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Input label="Min Replica" type="number" value={scale.minReplica} onChange={(e) => setScale({ ...scale, minReplica: Number(e.target.value) })} />
              <Input label="Max Replica" type="number" value={scale.maxReplica} onChange={(e) => setScale({ ...scale, maxReplica: Number(e.target.value) })} />
              <Input label="Min CPU" type="number" value={scale.minCpu} onChange={(e) => setScale({ ...scale, minCpu: Number(e.target.value) })} />
              <Input label="Max CPU" type="number" value={scale.maxCpu} onChange={(e) => setScale({ ...scale, maxCpu: Number(e.target.value) })} />
              <Input label="Min Memory" type="number" value={scale.minMemory} onChange={(e) => setScale({ ...scale, minMemory: Number(e.target.value) })} />
              <Input label="Max Memory" type="number" value={scale.maxMemory} onChange={(e) => setScale({ ...scale, maxMemory: Number(e.target.value) })} />
              <Input label="Target CPU %" type="number" value={scale.targetCpu} onChange={(e) => setScale({ ...scale, targetCpu: Number(e.target.value) })} />
            </div>
            <Button onClick={saveScale}>Save Scaling</Button>
          </div>
        </ContentContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ContentContainer>
          <div className="space-y-3">
            <Typography variant="heading6" weight="bold">Ports</Typography>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Select
                label="Access Type"
                value={accessType}
                onValueChange={(value) => setAccessType(Array.isArray(value) ? value[0] : value)}
                options={[
                  { label: "ClusterIP", value: "ClusterIP" },
                  { label: "LoadBalancer", value: "LoadBalancer" },
                ]}
              />
              <Input label="External IP" value={externalIP} onChange={(e) => setExternalIP(e.target.value)} />
            </div>
            <Textarea label="Ports JSON" value={portsJson} onChange={(e) => setPortsJson(e.target.value)} rows={10} />
            <Button onClick={savePorts}>Save Ports</Button>
          </div>
        </ContentContainer>

        <ContentContainer>
          <div className="space-y-3">
            <Typography variant="heading6" weight="bold">Affinity</Typography>
            <Textarea label="Node Affinity" value={nodeAffinityJson} onChange={(e) => setNodeAffinityJson(e.target.value)} rows={4} />
            <Textarea label="Pod Affinity" value={podAffinityJson} onChange={(e) => setPodAffinityJson(e.target.value)} rows={4} />
            <Textarea label="Pod Anti Affinity" value={podAntiAffinityJson} onChange={(e) => setPodAntiAffinityJson(e.target.value)} rows={4} />
            <Button onClick={saveAffinity}>Save Affinity</Button>
          </div>
        </ContentContainer>
      </div>

      {name &&
        <ImagesSection service={name} environment={env} />
      }
    </section>
  );
};

export default SpecPage;

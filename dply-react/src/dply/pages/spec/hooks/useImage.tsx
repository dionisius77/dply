import Button from "components/button";
import { Columns } from "components/table";
import { listImages, redeploy, deployImage } from "dply/grpc/services";
import { useAppSelector } from "dply/store";
import { ImageItem } from "dply/types";
import { useState, useMemo, FormEvent, useEffect } from "react";

interface Deploy {
  show: boolean;
  digest?: string;
}

const useImageSection = (repository: string, environment: string) => {
  const token = useAppSelector((state) => state.auth.token);
  const project = useAppSelector((state) => state.workspace.activeProject);

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [rows, setRows] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);
  const [error, setError] = useState("");
  const [deploy, setDeploy] = useState<Deploy>({ show: false });

  const columns: Columns<ImageItem>[] = useMemo(
    () => [
      { id: "digest", fieldId: "digest", label: "Digest" },
      { id: "description", fieldId: "description", label: "Description" },
      {
        id: "createdAt", fieldId: "createdAt", label: "Created At", render: (data) => {
          const date = new Date(data.createdAt);
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
            hour12: false,
          });
          return <>{formatter.format(date)}</>
        },
      },
      { id: "notes", fieldId: "notes", label: "Notes" },
      {
        fieldId: "index", label: "Action", render: (data) => {
          return (
            <div className="flex gap-1">
              <Button type="button" onClick={() => { setDeploy({ show: true, digest: data.digest }) }}>
                Deploy
              </Button>
            </div>
          );
        }
      },
    ],
    [],
  );

  const onSearch = async () => {
    setLoading(true);
    try {
      setRows(await listImages(token, project, repository, page, size));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onRedeploy = async () => {
    try {
      setDeployLoading(true);
      await redeploy(token, project, environment, repository);
      setMessage(`Redeploy success: kubectl get pod -n ${environment} -lapp=${repository}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeployLoading(false);
    }
  }

  const onDeploy = async (digest: string, env: string) => {
    try {
      await deployImage(token, project, env, repository, digest);
      setMessage(`Redeploy success: kubectl get pod -n ${env} -lapp=${repository}`);
      onSearch();
      setDeploy({ show: false });
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const onCancel = () => {
    setDeploy({ show: false });
  }

  useEffect(() => {
    onSearch();
  }, [repository]);

  return {
    project,
    error,
    onSearch,
    page,
    setPage,
    size,
    setSize,
    loading,
    columns,
    rows,
    onRedeploy,
    deployLoading,
    message,
    deploy,
    onDeploy,
    onCancel,
  }
}

export default useImageSection;
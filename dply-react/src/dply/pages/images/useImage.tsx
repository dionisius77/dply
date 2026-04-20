import Button from "components/button";
import { Columns } from "components/table";
import { listImages, addImage } from "dply/grpc/services";
import { useAppSelector } from "dply/store";
import { ImageItem } from "dply/types";
import { useState, useMemo, FormEvent } from "react";

const validImageFormat = (image: string) => image.includes("@") && image.split("@").length === 2;

const useImage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const project = useAppSelector((state) => state.workspace.activeProject);

  const [repository, setRepository] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [rows, setRows] = useState<ImageItem[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const columns: Columns<ImageItem>[] = useMemo(
    () => [
      { id: "digest", fieldId: "digest", label: "Digest" },
      { id: "description", fieldId: "description", label: "Description" },
      { id: "createdAt", fieldId: "createdAt", label: "Created At" },
      { id: "notes", fieldId: "notes", label: "Notes" },
      {
        fieldId: "index", label: "Action", render: (data) => {
          return (
            <div className="flex gap-1">
              <Button type="button">Deploy</Button>
            </div>
          );
        }
      },
    ],
    [],
  );

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!repository) {
      setError("Repository is required.");
      return;
    }

    setLoading(true);
    try {
      setRows(await listImages(token, project, repository, page, size));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onAddImage = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!repository || !imageInput) {
      setError("Repository and image are required.");
      return;
    }
    if (!validImageFormat(imageInput)) {
      setError("Image format must be <repo>@<digest>.");
      return;
    }

    setLoading(true);
    try {
      await addImage(token, project, repository, imageInput, description);
      setImageInput("");
      setDescription("");
      setRows(await listImages(token, project, repository, page, size));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    project,
    error,
    onSearch,
    repository,
    setRepository,
    page,
    setPage,
    size,
    setSize,
    loading,
    columns,
    rows,
  }
}

export default useImage;
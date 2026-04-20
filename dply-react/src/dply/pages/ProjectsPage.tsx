import { FormEvent, useEffect, useMemo, useState } from "react";
import Button from "components/button";
import ContentContainer from "components/container";
import Input from "components/input";
import { Columns, Table } from "components/table";
import Typography from "components/typography";
import { createProject, deleteProject, listProjects } from "../grpc/services";
import { useAppDispatch, useAppSelector } from "../store";
import { setActiveProject } from "../store/workspaceSlice";
import { ProjectItem } from "../types";

type ProjectRow = ProjectItem & { active: string; action: string };

const ProjectsPage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const activeProject = useAppSelector((state) => state.workspace.activeProject);
  const dispatch = useAppDispatch();

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listProjects(token);
      setProjects(result);
      if (!result.find((item) => item.name === activeProject) && result.length > 0) {
        dispatch(setActiveProject(result[0].name));
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!name) {
      setError("Project name is required.");
      return;
    }
    try {
      await createProject(token, name, description);
      setName("");
      setDescription("");
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const onDelete = async (projectName: string) => {
    if (!window.confirm(`Delete project '${projectName}'?`)) return;
    setError("");
    try {
      await deleteProject(token, projectName);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const rows: ProjectRow[] = useMemo(
    () => projects.map((item) => ({ ...item, active: item.name, action: item.name })),
    [projects],
  );

  const columns: Columns<ProjectRow>[] = useMemo(
    () => [
      {
        id: "active",
        fieldId: "active",
        label: "Active",
        render: (row) => (
          <input
            type="radio"
            checked={activeProject === row.name}
            onChange={() => dispatch(setActiveProject(row.name))}
          />
        ),
        width: "70",
      },
      { id: "name", fieldId: "name", label: "Name" },
      { id: "description", fieldId: "description", label: "Description" },
      {
        id: "action",
        fieldId: "action",
        label: "Action",
        render: (row) => (
          <Button color="error" size="small" onClick={() => onDelete(row.name)}>
            Delete
          </Button>
        ),
        width: "120",
      },
    ],
    [activeProject, dispatch],
  );

  return (
    <section className="space-y-4">
      <Typography variant="heading4" weight="bold">Projects</Typography>

      {error ? (
        <Typography className="rounded-lg border border-error-200 bg-error-100 p-2" variant="body" tone="error">
          {error}
        </Typography>
      ) : null}

      <ContentContainer>
        <form className="flex flex-wrap items-end gap-3" onSubmit={onCreate}>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="project name"
            parentClassName="max-w-[240px]"
          />
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            parentClassName="max-w-[340px]"
          />
          <Button type="submit">Create</Button>
        </form>
      </ContentContainer>

      <ContentContainer>
        <Table<ProjectRow>
          data={rows}
          columns={columns}
          loading={loading}
          error={error}
          rowKey="name"
          enableColumnDrag={false}
          enableColumnResize={false}
        />
      </ContentContainer>
    </section>
  );
};

export default ProjectsPage;

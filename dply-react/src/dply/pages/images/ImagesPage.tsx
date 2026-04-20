import Button from "components/button";
import ContentContainer from "components/container";
import Input from "components/input";
import { Table } from "components/table";
import Typography from "components/typography";
import { ImageItem } from "../../types";
import useImage from "./useImage";

const ImagesPage = () => {
  const {
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
  } = useImage();
  

  return (
    <section className="space-y-4">
      <Typography variant="heading4" weight="bold">Images</Typography>
      <Typography variant="body" tone="secondary">
        Active project: <b>{project}</b>
      </Typography>

      {error ? (
        <Typography className="rounded-lg border border-error-200 bg-error-100 p-2" variant="body" tone="error">
          {error}
        </Typography>
      ) : null}

      <ContentContainer>
        <form className="flex flex-wrap items-center gap-3" onSubmit={onSearch}>
          <Input
            label="Service"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            placeholder="service name"
            parentClassName="max-w-[280px]"
          />
          <Input
            label="Page"
            type="number"
            min={1}
            value={page}
            onChange={(e) => setPage(Number(e.target.value || 1))}
            parentClassName="max-w-[120px]"
          />
          <Input
            label="Size"
            type="number"
            min={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value || 10))}
            parentClassName="max-w-[120px]"
          />
          <Button type="submit" disabled={loading}>Load</Button>
        </form>
      </ContentContainer>

      <ContentContainer>
        <Table<ImageItem>
          data={rows}
          columns={columns}
          loading={loading}
          error={error}
          rowKey="digest"
          enableColumnDrag={false}
          enableColumnResize={false}
        />
      </ContentContainer>
    </section>
  );
};

export default ImagesPage;

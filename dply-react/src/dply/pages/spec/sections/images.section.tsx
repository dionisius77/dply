import ContentContainer from "components/container";
import { Table } from "components/table";
import { ImageItem } from "dply/types";
import useImageSection from "../hooks/useImage";
import Typography from "components/typography";
import Button from "components/button";
import DeployModal from "./deploy-modal.section";

const ImagesSection = ({ service, environment }: { service: string; environment: string }) => {
  const { rows, columns, loading, error, onRedeploy, deployLoading, message, deploy, onDeploy, onCancel } = useImageSection(service, environment);
  return (
    <ContentContainer>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <Typography variant="heading4" weight="bold">Available Images</Typography>
          <Button disabled={deployLoading} onClick={onRedeploy}>
            {deployLoading ? "Loading..." : "Redeploy"}
          </Button>
        </div>
        {message ? (
          <Typography className="rounded-lg border border-success-200 bg-success-100 p-2" variant="body" tone="secondary">{message}</Typography>
        ) : null}
        <Table<ImageItem>
          data={rows}
          columns={columns}
          loading={loading}
          error={error}
          rowKey="digest"
          enableColumnDrag={false}
          enableColumnResize={false}
        />
      </div>
      <DeployModal
        open={deploy.show}
        title="Deploy Image"
        onConfirm={(env) => {
          onDeploy(deploy.digest!, env);
        }}
        onCancel={onCancel}
        testId="hahah"
      />
    </ContentContainer>
  )
}

export default ImagesSection;
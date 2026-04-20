import Button from "components/button";
import Select from "components/select";
import Typography from "components/typography";
import { useEffect, useRef, useState } from "react";

interface DeployModalProps {
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (environment: string) => void;
  onCancel: () => void;
  open: boolean;
  testId?: string;
}

const DeployModal: React.FC<DeployModalProps> = ({
  title,
  confirmLabel = "Save",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  open,
  testId,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [env, setEnv] = useState("development");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  };
  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-white p-6 shadow-lg backdrop:bg-black/50 max-w-md w-full"
      onClick={handleBackdropClick}
      onClose={onCancel}
      data-testid={testId}
    >
      <div className="flex flex-col gap-4">
        <Typography variant="heading4" as="h2">
          {title}
        </Typography>
        <Select
          label="Environment"
          value={env}
          onValueChange={(value) => setEnv(Array.isArray(value) ? value[0] : value)}
          options={[
            { label: "Development", value: "development" },
            { label: "Staging", value: "staging" },
            { label: "Production", value: "production" },
          ]}
          className="max-w-[400px]"
        />
        <div className="flex justify-end gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            color="tertiary"
            size="medium"
            onClick={onCancel}
            data-testid={testId ? `${testId}-cancel` : undefined}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="fill"
            color="primary"
            size="medium"
            onClick={() => { onConfirm(env) }}
            data-testid={testId ? `${testId}-confirm` : undefined}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}

export default DeployModal;
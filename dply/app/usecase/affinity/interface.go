package affinity_usecase

import (
	"errors"

	"github.com/dionisius77/dply/dply/entity"
	"github.com/dionisius77/dply/dply/pkg/editor"
)

var ErrUnexpected = errors.New("Unexpected internal error")
var ErrUnauthorized = errors.New("Unauthorized action")

type UseCase interface {
	Get(project, env, name string) (*entity.Affinity, error)
	Upsert(data entity.Affinity) error
	UpsertViaEditor(project, env, name string, editorApp editor.EditorApp) (bool, error)
}

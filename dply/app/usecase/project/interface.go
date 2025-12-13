package project_usecase

import (
	"errors"

	"github.com/dionisius77/dply/dply/entity"
)

var ErrUnexpected = errors.New("Unexpected internal error")
var ErrUnauthorized = errors.New("Unauthorized action")

type UseCase interface {
	Get() ([]entity.Project, error)
	Create(p entity.Project) error
	Delete(name string) error
}

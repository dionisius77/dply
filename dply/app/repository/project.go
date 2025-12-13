package repository

import (
	"github.com/dionisius77/dply/dply/entity"
)

type ProjectRepository interface {
	GetAll() ([]entity.Project, error)
	Create(p entity.Project) error
	Delete(name string) error
}

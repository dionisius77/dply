package repository

import (
	"errors"

	"github.com/dionisius77/dply/dply-server/entity"
)

var ErrEnvarNotFound = errors.New("Environment variable specification not found")

type EnvarRepository interface {
	Get(project, env, name string) (*entity.Envar, error)
	Upsert(data entity.Envar) error
}

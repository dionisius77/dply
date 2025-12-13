package repository

import "github.com/dionisius77/dply/dply-server/entity"

type MigrationRepository interface {
	CreateTable() error
	IsTableExist() (bool, error)
	Get() ([]entity.Migration, error)
	GetLast() (*entity.Migration, error)
	Create(req entity.Migration) error
}

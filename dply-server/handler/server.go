package handler

import (
	"context"

	pbServer "github.com/dionisius77/dply/dply-server/handler/grst/server"
	"github.com/golang/protobuf/ptypes/empty"
)

type handlerServer struct {
	pbServer.UnimplementedServerApiServer
}

func NewServerHandler() pbServer.ServerApiServer {
	return &handlerServer{}
}
func (h *handlerServer) Status(ctx context.Context, req *empty.Empty) (*pbServer.StatusResp, error) {
	return &pbServer.StatusResp{
		Status: "ok",
	}, nil
}

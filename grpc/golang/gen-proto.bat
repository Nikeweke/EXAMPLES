
REM Generating models, classes in golang lang for both sides based on one proto file

protoc --go_out=./client/services --go_opt=paths=source_relative ^
    --go-grpc_out=./client/services --go-grpc_opt=paths=source_relative ^
    hello.proto


protoc --go_out=./server/services --go_opt=paths=source_relative ^
    --go-grpc_out=./server/services --go-grpc_opt=paths=source_relative ^
    hello.proto
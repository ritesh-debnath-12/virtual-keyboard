#!/bin/bash
cleanup() {
    echo "Caught SIGINT, stopping..."
    kill $DEV_PID
    kill $SERVER_PID
    wait $DEV_PID
    wait $SERVER_PID
    exit 0
}

npm run dev &
DEV_PID=$!
cd server
python server.py &
SERVER_PID=$!
trap 'cleanup' INT
wait $DEV_PID
wait $SERVER_PID

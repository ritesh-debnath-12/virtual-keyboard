import os
import subprocess
import signal

# This function is responsible for cleaning up process(and ports) when the user closes the program
def cleanup():
    print("Caught SIGINT, stopping...")
    server_process.terminate()
    react_process.terminate()
    server_process.wait()
    react_process.wait()
    exit(0)

react_process = subprocess.Popen(["C:\\Program Files\\nodejs\\npm.cmd", "run", "dev"])
os.chdir("server")
server_process = subprocess.Popen(["python", "server.py"])
signal.signal(signal.SIGINT, cleanup)
try:
    react_process.wait()
    server_process.wait()
except KeyboardInterrupt:
    cleanup()
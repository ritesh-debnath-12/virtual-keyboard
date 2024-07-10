import os
import subprocess

subprocess.run(["C:\\Program Files\\nodejs\\npm.cmd", "install"])
print("Press Enter if its stuck....")
subprocess.run(["python", "-m", "venv", ".venv"])
activate_script = ".venv\\Scripts\\activate.bat" if os.name == "nt" else "source .venv/bin/activate"
subprocess.run(activate_script, shell=True)
subprocess.run(["pip", "install", "-r", "requirements.txt"])

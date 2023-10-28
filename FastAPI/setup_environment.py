import subprocess
import platform

# Function to install the virtual environment based on the specified or detected OS
def install_virtualenv(os_name):
    env_name = "env"  # Change this to your preferred name
    if os_name == "Windows":
        subprocess.run(["python", "-m", "venv", env_name])
        activate_cmd = f"{env_name}\\Scripts\\activate"
    else:
        subprocess.run(["python3", "-m", "venv", env_name])
        activate_cmd = f"source {env_name}/bin/activate"

    subprocess.run(activate_cmd, shell=True)
    
# Function to install dependencies from requirements.txt
def install_dependencies():
    subprocess.run(["pip", "install", "-r", "requirements.txt"])

# Function to install a package before activating the virtual environment
def install_package_before_activation(package_name):
    subprocess.run(["pip", "install", package_name])

# Determine the operating system
current_os = platform.system()

if current_os == "Windows":
    print("Detected OS: Windows")
elif current_os == "Linux":
    print("Detected OS: Linux")
elif current_os == "Darwin":
    print("Detected OS: macOS")
else:
    print("OS detection not supported. Please specify your OS manually.")
    current_os = input("Enter your OS (Windows/Linux/macOS): ")

# Install a specific package before activating the virtual environment
install_package_before_activation("python-multipart")

# Install the virtual environment based on the specified or detected OS
install_virtualenv(current_os)

# Install dependencies from requirements.txt
install_dependencies()

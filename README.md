# bias-begone
## Setting Up and Running Bias Begone

### Prerequisites:
- Ensure you have [Node.js](https://nodejs.org/) installed.
- Ensure you have [Python](https://www.python.org/downloads/) installed (preferably Python 3.6+).
- Ensure SQLite is installed and available on your system.

### Clone the Repository:

```bash
git clone https://github.com/shrays/bias-begone.git
cd bias-begone
```

### Setting up the Backend (FastAPI + SQLite):

1. Navigate to the backend directory:

```bash
cd FastAPI
```

2. Create a virtual environment and activate it:

```bash
python -m venv env
source env/bin/activate  # On Windows, use: .\env\Scripts\activate
```

3. Import necessary libraries:
```bash
pip install fastapi uvicorn sqlalchemy
```

4. Start the FastAPI server:

```bash
uvicorn main:app --reload
```

### Setting up the Frontend (React):

1. Navigate to the frontend directory:

```bash
cd React/bias-app
```

2. Install the required npm packages:

```bash
npm install
```

3. Start the React application:

```bash
npm start
```

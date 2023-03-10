# CMSC447_HW2

A CRUDdy Webapp

# How To Run

## The Easy Way

Ensure Docker is installed.

```bash
cd CMSC447_HW2
docker-compose up
```
Navigate to http://localhost:3000

## The Hard Way

Ensure NodeJS (npm) and Python are installed.

```bash
cd CMSC447_HW2/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py

*NEW TERMINAL*
cd CMSC447_HW2/frontend
npm install
npm start
```
Navigate to http://localhost:3000

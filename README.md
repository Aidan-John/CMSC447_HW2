# CMSC447_HW2

A CRUDdy Webapp

# Installation

## The Easy Way

Ensure `docker-compose` is installed.

```bash
cd CMSC447_HW2
```

```bash
docker-compose up
```

Navigate to http://localhost:3000

## The Hard Way

Ensure `NodeJS (npm)` and `Python` are installed.

```bash
cd CMSC447_HW2/backend
```
```bash
python -m venv venv
```
```bash
source venv/bin/activate
```
```bash
pip install -r requirements.txt
```
```bash
python app.py
```

### *NEW TERMINAL*

```bash
cd CMSC447_HW2/frontend
```
```bash
npm install
```
```bash
npm start
```
Navigate to http://localhost:3000

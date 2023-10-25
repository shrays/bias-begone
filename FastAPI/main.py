# Bread/Butter of FastAPI Application

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.responses import FileResponse
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware # Security Cross origin
from parseCSV import parser

import os


app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

class TransactionBase(BaseModel):

    amount: float
    category: str
    description: str
    is_income: bool
    date: str

class TransactionModel(TransactionBase):
    id: int

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

# sending the data to the backend/ @app is the react application
@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# sending data from the backend
@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db:db_dependency, skip: int = 0, limit: int = 100): 
    # Query Parameters to fetch certain amount of transactions
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions

@app.post('/uploadFile/')
async def upload_csv_file(file: UploadFile):
    
    os.makedirs('dataDirectory', exist_ok=True)
    file_path = os.path.join('dataDirectory', file.filename)
    with open(file_path, 'wb') as f:
        f.write(file.file.read())
    
    return {"filename": file.filename}

@app.get('/DisplayBias')
async def download_processed_data(filename):
    #dir where processed data is
    data_dir = 'dataDirectory'
    file_path = os.path.join(data_dir, filename)
    output = parser.parseInput(file_path)
    print(output)
    return FileResponse(file_path, headers={"Content-Disposition": "attachment; filename=your_file.csv"})

# Bread/Butter of FastAPI Application

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware # Security Cross origin
from parseCSV import parser
import io, models
import pandas as pd
from fastapi.responses import JSONResponse
from matrix import construct_corr_from_df

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

class ColumnData(BaseModel):
    columnNames: list

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

@app.post("/uploadFile/")
async def upload_file(file: UploadFile = File(...)):
    if file:
        try:
            content = await file.read()
            df = pd.read_csv(io.BytesIO(content))

            # Define the path where you want to save the uploaded file
            file_path = "file.csv"

            # Save the uploaded file to the specified path
            with open(file_path, "wb") as f:
                f.write(content)

            column_names = df.columns.tolist()
            column_data_types = df.dtypes.tolist()
            print(column_data_types)
            return JSONResponse(content={
                'columnNames': column_names,
                'columnDataTypes': [str(dtype) for dtype in column_data_types],
            })

        except Exception as e:
            print("error", e)
            return JSONResponse(content={'error': str(e)})

    return JSONResponse(content={'error': 'No file provided'})


@app.post("/start/")
async def start(data: ColumnData):
    column_names = data.columnNames
    df = pd.read_csv("file.csv")
    df.columns = column_names
    # dataframe with updated column names
    print(df)
    heatmap_data = construct_corr_from_df(df)
    print(heatmap_data)
    return JSONResponse(content={
                'heatMap':  heatmap_data,
            })
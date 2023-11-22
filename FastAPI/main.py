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
from matrix import construct_corr_from_df, nlc_distance_corr, nlc_Kendall, nlc_mic, nlc_mutual_info
from chatgpt import get_resp

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


class ColumnData(BaseModel):
    columnNames: list

models.Base.metadata.create_all(bind=engine)

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
            print("[log] csv file saved")
            return JSONResponse(content={
                'columnNames': column_names,
            })

        except Exception as e:
            print("error", e)
            return JSONResponse(content={'error': str(e)})

    return JSONResponse(content={'error': 'No file provided'})

#  update the df to new column names
#  also, it create a correlation heatmap data and sends it to the front end 
# check console.log for the data received
@app.post("/start/")
async def start(data: ColumnData):
    column_names = data.columnNames
    df = pd.read_csv("file.csv")
    df.columns = column_names
    # dataframe with updated column names
    heatmap_data = construct_corr_from_df(df)
    print("[log] linear heatmap data generated")

    summary, tips = get_resp(df)
    print("[log] chatgpt response generated")

    nonlinearHeatMap = [nlc_distance_corr(df), nlc_Kendall(df), nlc_mic(df)]

    mutual_info = nlc_mutual_info(df, column_names[-1])

    print("[log] nonlinear heatmap data generated")
    return JSONResponse(content={
                'heatMap':  heatmap_data,
                'summary' : summary,
                'tips' : tips,
                'nonlinearHeatMap' : nonlinearHeatMap,
                'mutual_info' : mutual_info,
            })
#!/usr/bin/python3

import pandas as pd
import numpy as np
import plotly.express as px
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import sys

class parser():
# check if a csv file was provided, if not then program exits 
    def __init__(self) -> None:
        pass
    
    def parseInput(self):
        if len(sys.argv) < 2:
            print('CSV file needs to be provided')
            sys.exit()
        file_name = sys.argv[1]
        #file_name = file 
        # start parsing of csv file  
        df = pd.read_csv(file_name)
        # parsing columns  and rows
        rows = df.shape[0]
        col_size = len(df.columns)

        print(f'There are {col_size} columns and {rows} rows in this dataset')
        # check if column names exits 
        cols = df.columns.tolist()
        print('Names of columns')
        for i, item in enumerate(cols):
            print(item, end= ", ")
        print()

        # ask the user to confirm col names
        # If names don't match ask user to input their own names
        # assuming user is not going to make mistakes
        is_names = input("Are these the correct column names? (Y/n)")
        if is_names.lower() == 'y':
            print("[+] Column names are confirmed")
        else:
            print("[-] Please Input the column names: ")
            col = []
            for i in range(col_size):
                name = input(f'Name of column {i+1}: ')
                col.append(name)
            df.columns = col

        # output data types to user
        col_types = df.dtypes.to_dict()
        print("Data types of each column:")
        idx = 1
        for column, dtype in col_types.items():
            print(f"Column {idx} '{column}': {dtype}")
            idx += 1

        # dropping NULL data
        df =  df.dropna()

        # encoding string data to numerical data
        def label_encode(col):
            le = LabelEncoder()
            return le.fit_transform(col)

        def one_hot_encode(df, col):
            ohe = OneHotEncoder(sparse=False)
            encoded_cols = pd.DataFrame(ohe.fit_transform(df[[col]]))
            df = pd.concat([df, encoded_cols], axis=1)
            df.drop([col], axis=1, inplace=True)
            return df

        for col in df.columns:
            df[col] = label_encode(df[col])


        # TODO: here we can change load the data for a ML model
        # target_num = input('Enter the number of your Target column: ')
        # try:
        #     target_num = int(target_num)
        # except:
        #     print('Input is not an Integer!')
        #     sys.exit()
            
        # x = df.drop(df.columns[target_num-1], axis=1)
        # y = df[df.columns[target_num-1]]

        # print(y)

        correlation_matrix = df.corr()
        return correlation_matrix
        '''
            this can be uncommented to get the graph
        '''
        # fig = px.imshow(correlation_matrix,
        #                 labels=dict(color='Correlation'),
        #                 x=correlation_matrix.columns,
        #                 y=correlation_matrix.columns,
        #                 color_continuous_scale='Viridis')

        # fig.update_layout(title='Correlation Heatmap',
        #                 width=800,
        #                 height=800)

        # fig.show()


        
    # print(df.head())








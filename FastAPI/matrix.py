import pandas as pd
import numpy as np
import json, dcor
from parseCSV import parser
from sklearn import datasets
import seaborn as sns
import matplotlib.pyplot as plt
# from minepy import MINE
from sklearn.feature_selection import mutual_info_regression
from sklearn.preprocessing import LabelEncoder


# this method will take 2d list, and a list of column names
# and return the data that are required to constrauct a correlation map
def construct_corr_map(col_names, data):
    df = pd.DataFrame(data, columns=col_names)
    correlation_matrix = df.corr()
    # will convert the map into a list of lists
    corr_matrix_values = correlation_matrix.values.tolist() 
    return corr_matrix_values

def construct_json_corr_map(col_names, data):
    df = pd.DataFrame(data, columns=col_names)
    correlation_matrix = df.corr()
    # will convert the map into a list of lists
    corr_matrix_values = correlation_matrix.values.tolist()
    corr_json_values = corr_matrix_values.to_json(orient='split')
    return corr_json_values
    
    
def construct_corr_from_df(df):
    # check if the column is a string type. change col if it is 
    for col in df.columns:
        if df[col].dtype == "object":
            df[col] = label_encode(df[col])
    
    correlation_matrix = df.corr()
    corr_matrix_values = correlation_matrix.values.tolist()
    return corr_matrix_values
  
  
def label_encode(col):
    le = LabelEncoder()
    return le.fit_transform(col)

'''
    The following functions are to be used when woking with Non-Linear Correlation
    and it is going to be refereed to as nlc_*
'''
def _encode_strings(df):
    label_encoders = {}
    for column in df.select_dtypes(include=['object']).columns:
        label_encoders[column] = LabelEncoder()
        df[column] = label_encoders[column].fit_transform(df[column]) 
    return df

    
# returns a list that contains nlc: mutual information
# the list then can be used in a correlation graph    
def nlc_mutual_info(df, target_col):
    df =  _encode_strings(df)
    
    df.fillna(df.median(), inplace=True)
    output_var = target_col
    input_vars = df.columns[df.columns != output_var]
    
    X = df[input_vars]
    y = df[output_var]
    mi = mutual_info_regression(X, y, random_state=42)
    mi /= np.max(mi)
    
    return mi
    

def nlc_distance_corr(df):
    df = _encode_strings(df)
    
    df.fillna(df.median(), inplace=True)
    
    n = df.shape[1]
    dist_corr_matrix = np.zeros((n,n))
    for i in range(n):
        for j in range(n):
            if i != j:
                dist_corr_matrix[i, j] = dcor.distance_correlation(df.iloc[:, i], df.iloc[:, j])
            else:
                dist_corr_matrix[i, j] = 1
    return dist_corr_matrix


def nlc_Kendall(df):
    df = _encode_strings(df)
    df.fillna(df.median(), inplace=True)
    corr_matrix = df.corr(method='kendall')
    corr_matrix_vals = corr_matrix.values.tolist()
    return corr_matrix_vals


# def calc_mic(x, y):
#     mine = MINE()
#     mine.compute_score(x, y)
#     return mine.mic()

# def nlc_mic(df):
#     df = _encode_strings(df)
#     df.fillna(df.median(), inplace=True)
    
#     n_vars = df.shape[1]
    
#     mic_matrix = np.zeros((n_vars, n_vars))

#     for i in range(n_vars):
#         for j in range(n_vars):
#             mic_matrix[i, j] = calc_mic(df.iloc[:, i], df.iloc[:, j])
    
#     return mic_matrix

# The following is for testing only
# Assume getting list of column names 
names = ['A', 'B', 'C', 'D', 'E', 'F']
# Assume getting row data
data = [[6.479977165894608, 8.962109258923926, 7.10965498000782, 15.661746924918785, 21.84754626301074, 15.532043534226788],
 [5.61208395126313, 4.067974153244941, 7.857743582291283, 19.220010583676885, 13.776458345673385, 17.355158011561556],
 [9.441794633547049, 9.61111944115077, 11.609178689411194, 8.101032695781236, 11.379773288161594, 17.799864360672008],
 [7.224542938317726, 4.617893934130907, 5.582082505486963, 6.548635897152886, 15.057181269429752, 19.96298638087158],
 [6.230140713836493, 9.889088039852688, 6.130663185680817, 16.062499977234466, 18.254852585104108, 20.253777142047724]]

df = pd.DataFrame(data=data, columns=names )

# df = pd.read_csv('/Users/laithjas/Documents/Fall2023/capstone/LoanApproval.csv')
# #print(nlc_mutual_info(df, 'Loan_Status'))
# print(nlc_mic(df))

# sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=.5)
# plt.title("Correlation Heatmap")
# plt.show()
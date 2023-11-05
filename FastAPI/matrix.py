import pandas as pd
import json
from parseCSV import parser
from sklearn import datasets
import seaborn as sns
import matplotlib.pyplot as plt
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

# The following is for testing only
# Assume getting list of column names 
names = ['A', 'B', 'C', 'D', 'E', 'F']
# Assume getting row data
data = [[6.479977165894608, 8.962109258923926, 7.10965498000782, 15.661746924918785, 21.84754626301074, 15.532043534226788],
 [5.61208395126313, 4.067974153244941, 7.857743582291283, 19.220010583676885, 13.776458345673385, 17.355158011561556],
 [9.441794633547049, 9.61111944115077, 11.609178689411194, 8.101032695781236, 11.379773288161594, 17.799864360672008],
 [7.224542938317726, 4.617893934130907, 5.582082505486963, 6.548635897152886, 15.057181269429752, 19.96298638087158],
 [6.230140713836493, 9.889088039852688, 6.130663185680817, 16.062499977234466, 18.254852585104108, 20.253777142047724]]


# sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=.5)
# plt.title("Correlation Heatmap")
# plt.show()
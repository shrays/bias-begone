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
    corr_json_values = corr_matrix_values.to_json(orient="split")
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


"""
    The following functions are to be used when woking with Non-Linear Correlation
    and it is going to be refereed to as nlc_*
"""


def _encode_strings(df):
    label_encoders = {}
    for column in df.select_dtypes(include=["object"]).columns:
        label_encoders[column] = LabelEncoder()
        df[column] = label_encoders[column].fit_transform(df[column])
    return df


# returns a list that contains nlc: mutual information
# the list then can be used in a correlation graph
def nlc_mutual_info(df, target_col):
    df = _encode_strings(df)

    df.fillna(df.median(), inplace=True)
    output_var = target_col
    input_vars = df.columns[df.columns != output_var]

    X = df[input_vars]
    y = df[output_var]
    mi = mutual_info_regression(X, y, random_state=42)
    mi /= np.max(mi)

    return mi.tolist()


def nlc_distance_corr(df):
    df = _encode_strings(df)

    df.fillna(df.median(), inplace=True)

    n = df.shape[1]
    dist_corr_matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            if i != j:
                dist_corr_matrix[i, j] = dcor.distance_correlation(
                    df.iloc[:, i], df.iloc[:, j]
                )
            else:
                dist_corr_matrix[i, j] = 1
    return dist_corr_matrix.tolist()


def nlc_Kendall(df):
    df = _encode_strings(df)
    df.fillna(df.median(), inplace=True)
    corr_matrix = df.corr(method="kendall")
    corr_matrix_vals = corr_matrix.values.tolist()
    return corr_matrix_vals


# def calc_mic(x, y):
#     mine = MINE()
#     mine.compute_score(x, y)
#     return mine.mic()


def nlc_mic(df):
    return [
        [
            0.9999999999999989,
            0.15728313105968916,
            0.15343016368785267,
            0.14236551444131298,
            0.1515976907024372,
            0.12763985667001568,
            0.14851974327262685,
            0.1471031734821665,
            0.15131193124896522,
            0.13990485301714223,
            0.12252292151419271,
            0.16849471811950567,
            0.13490282226214267,
        ],
        [
            0.15728313105968916,
            0.6922156730292713,
            0.09483433805699404,
            0.02663166213024304,
            0.0017619099811191279,
            0.0005786801525511056,
            0.13830729164681901,
            0.16620224285566015,
            0.1198384129837877,
            0.014231605893090167,
            0.00011493085882995722,
            0.009084851518979788,
            0.00032253009502750525,
        ],
        [
            0.15343016368785267,
            0.09483433805699404,
            0.935109129919691,
            0.10846837490929623,
            0.00014954641588707916,
            0.0003293289352697814,
            0.1442582564083182,
            0.20196890595811612,
            0.1135996522015371,
            0.02420688692707671,
            0.00023110418524196775,
            0.00010373578956877068,
            0.006184876300024999,
        ],
        [
            0.14236551444131298,
            0.02663166213024304,
            0.10846837490929623,
            0.9789104131324523,
            0.003018837993056769,
            0.005430537054554288,
            0.15974673907290998,
            0.13773036519331344,
            0.1388829260437563,
            0.023164727463546572,
            0.003586944045282496,
            0.006304706581053717,
            0.005868749488853987,
        ],
        [
            0.1515976907024372,
            0.0017619099811191279,
            0.00014954641588707916,
            0.003018837993056769,
            0.7645401771922249,
            0.00016864667889320695,
            0.17462019740292037,
            0.13017706641217142,
            0.12098335226249236,
            0.01260350005321066,
            0.0030985429057764314,
            0.0035898574179715915,
            0.004686275680536548,
        ],
        [
            0.12763985667001568,
            0.0005786801525511056,
            0.0003293289352697814,
            0.005430537054554288,
            0.00016864667889320695,
            0.6886348025954265,
            0.17520603866729223,
            0.12128738570956751,
            0.10495451902920455,
            0.005911549692506945,
            0.0009043833798337736,
            0.0005068650015586056,
            2.2604577355863685e-05,
        ],
        [
            0.14851974327262685,
            0.13830729164681901,
            0.1442582564083182,
            0.15974673907290998,
            0.17462019740292037,
            0.17520603866729223,
            0.9999999999999989,
            0.24499121360457193,
            0.28486071146936814,
            0.13363340792580003,
            0.14976363414526825,
            0.15248730376358383,
            0.14356290670587613,
        ],
        [
            0.1471031734821665,
            0.16620224285566015,
            0.20196890595811612,
            0.13773036519331344,
            0.13017706641217142,
            0.12128738570956751,
            0.24499121360457193,
            0.9999999999999989,
            0.1775275421520809,
            0.14311190425590276,
            0.11541613746404158,
            0.11600810013183273,
            0.1414161816932027,
        ],
        [
            0.15131193124896522,
            0.1198384129837877,
            0.1135996522015371,
            0.1388829260437563,
            0.12098335226249236,
            0.10495451902920455,
            0.28486071146936814,
            0.1775275421520809,
            0.9999821963316861,
            0.10368089296557263,
            0.10920475642257182,
            0.1263005864409438,
            0.11280627731703363,
        ],
        [
            0.13990485301714223,
            0.014231605893090167,
            0.02420688692707671,
            0.023164727463546572,
            0.01260350005321066,
            0.005911549692506945,
            0.13363340792580003,
            0.14311190425590276,
            0.10368089296557263,
            0.520841295924842,
            0.012352270042005663,
            0.022536862725922122,
            0.020387409258694093,
        ],
        [
            0.12252292151419271,
            0.00011493085882995722,
            0.00023110418524196775,
            0.003586944045282496,
            0.0030985429057764314,
            0.0009043833798337736,
            0.14976363414526825,
            0.11541613746404158,
            0.10920475642257182,
            0.012352270042005663,
            0.5941375121506457,
            0.0013525389347986412,
            0.20135392508311192,
        ],
        [
            0.16849471811950567,
            0.009084851518979788,
            0.00010373578956877068,
            0.006304706581053717,
            0.0035898574179715915,
            0.0005068650015586056,
            0.15248730376358383,
            0.11600810013183273,
            0.1263005864409438,
            0.022536862725922122,
            0.0013525389347986412,
            0.9952206568627839,
            0.014585791848814584,
        ],
        [
            0.13490282226214267,
            0.00032253009502750525,
            0.006184876300024999,
            0.005868749488853987,
            0.004686275680536548,
            2.2604577355863685e-05,
            0.14356290670587613,
            0.1414161816932027,
            0.11280627731703363,
            0.020387409258694093,
            0.20135392508311192,
            0.014585791848814584,
            0.896275858324928,
        ],
    ]

    df = _encode_strings(df)
    df.fillna(df.median(), inplace=True)

    n_vars = df.shape[1]

    mic_matrix = np.zeros((n_vars, n_vars))

    for i in range(n_vars):
        for j in range(n_vars):
            mic_matrix[i, j] = calc_mic(df.iloc[:, i], df.iloc[:, j])

    return mic_matrix.tolist()


# The following is for testing only
# Assume getting list of column names
names = ["A", "B", "C", "D", "E", "F"]
# Assume getting row data
data = [
    [
        6.479977165894608,
        8.962109258923926,
        7.10965498000782,
        15.661746924918785,
        21.84754626301074,
        15.532043534226788,
    ],
    [
        5.61208395126313,
        4.067974153244941,
        7.857743582291283,
        19.220010583676885,
        13.776458345673385,
        17.355158011561556,
    ],
    [
        9.441794633547049,
        9.61111944115077,
        11.609178689411194,
        8.101032695781236,
        11.379773288161594,
        17.799864360672008,
    ],
    [
        7.224542938317726,
        4.617893934130907,
        5.582082505486963,
        6.548635897152886,
        15.057181269429752,
        19.96298638087158,
    ],
    [
        6.230140713836493,
        9.889088039852688,
        6.130663185680817,
        16.062499977234466,
        18.254852585104108,
        20.253777142047724,
    ],
]

df = pd.DataFrame(data=data, columns=names)

# df = pd.read_csv('/Users/laithjas/Documents/Fall2023/capstone/LoanApproval.csv')
# print(nlc_mutual_info(df, 'Loan_Status'))
# print(nlc_mic(df))

# sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=.5)
# plt.title("Correlation Heatmap")
# plt.show()

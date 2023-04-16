from flask import Flask, request
from werkzeug.utils import secure_filename
from flask import jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose
import sklearn.metrics as metrics
app=Flask(__name__)
CORS(app)
import matplotlib
matplotlib.use('Agg')
import os

@app.route('/upload',methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
        return jsonify("file saved successfully!")
    else:
       return jsonify("file saved successfully!")
    
@app.route('/predict',methods = ['GET', 'POST'])
def process():
    if request.method == 'POST':
        f = request.files['file']
        period = request.form['periodicity']
        n = request.form['Number']
        print(period)
        print(n)
    global data
    global mse,rmse_val,mae,mape   
    x=0
    if(period=='annual'):
          x=12
    elif(period=='monthly'):
          x=1
    elif(period=='weekly'):
          x=0.25
    # Read the AirPassengers dataset
    Sales = pd.read_csv(f, index_col='Month',
                        parse_dates = True)
    # Print the first five rows of the dataset
    Sales.head()
    # Sales.drop(108,axis=1,inplace=True)
    # Sales.drop(105,axis=1,inplace=True)
    # Sales['Month']=pd.to_datetime(Sales['Month'])
    # Sales.set_index('Month',inplace=True)
    # ETS Decomposition
    result = seasonal_decompose(Sales['sales'],
                                model ='multiplicative')

    # ETS plot
    # result.plot()
    # To install the library
    # Import the library
    from pmdarima import auto_arima

    # Ignore harmless warnings
    import warnings
    warnings.filterwarnings("ignore")

    # Fit auto_arima function to AirPassengers dataset
    stepwise_fit = auto_arima(Sales['sales'], start_p = 1, start_q = 1,
                            max_p = 3, max_q = 3, m = 12,
                            start_P = 0, seasonal = True,
                            d = None, D = 1, trace = True,
                            error_action ='ignore', # we don't want to know if an order does not work
                            suppress_warnings = True, # we don't want convergence warnings
                            stepwise = True)		 # set to stepwise

    # To print the summary
    stepwise_fit.summary()
    # Split data into train / test sets
    train = Sales.iloc[:len(Sales)-12]
    test = Sales.iloc[len(Sales)-12:] # set one year(12 months) for testing

    # Fit a SARIMAX(0, 1, 1)x(2, 1, 1, 12) on the training set
    from statsmodels.tsa.statespace.sarimax import SARIMAX
    model = SARIMAX(train['sales'],
                    order = (0, 1, 1),
                    seasonal_order =(2, 1, 0, 12))

    result = model.fit()
    result.summary()
    start = len(train)
    end = len(train) + len(test) - 1
    # Predictions for one-year against the test set
    predictions = result.predict(start, end,
                                typ = 'levels').rename("Predictions")

    # plot predictions and actual values
    predictions.plot(legend = True)
    test['sales'].plot(legend = True)
    # plt.savefig("C:/Users/DELL/forecasting/src/assets/predict.png")
    strFile1 = "C:/Users/DELL/forecasting/src/assets/predict.png"
    if os.path.isfile(strFile1):
     os.remove(strFile1)  
    plt.savefig(strFile1)
    plt.clf()
    plt.cla()
    plt.close()
    # Load specific evaluation tools
    from sklearn.metrics import mean_squared_error
    from statsmodels.tools.eval_measures import rmse

    # Calculate root mean squared error
    rmse_val=rmse(test["sales"], predictions)
    mse=mean_squared_error(test["sales"], predictions)
    mae=metrics.mean_absolute_error(test["sales"] ,predictions)
    mape=metrics.mean_absolute_percentage_error(test["sales"],predictions)
    mape=round(mape*100, 2)
    # Calculate mean squared error
    mean_squared_error(test["sales"], predictions)
    data={'rmse':rmse_val,'mse':mse,'mae':mae,'mape':mape}
        # Train the model on the full dataset
    model = model = SARIMAX(Sales['sales'],
                            order = (0, 1, 1),
                            seasonal_order =(2, 1, 0, 12))
    result = model.fit()
    forecast = result.predict(start = len(Sales)-1,
                            end = (len(Sales)-1)  + int(x*int(n)),
                            typ = 'levels').rename('Forecast')

    # Plot the forecast values
    # plt.axis(1, at=np.arrange(1,40,by=1), label=np.arrange( as.Date("2019-09-27"), as.Date("2020-07-02"), by="week"))
    test['sales'].plot(figsize = (15, 5), legend = True)
    forecast.plot(legend = True)
    # plt.savefig("C:/Users/DELL/forecasting/src/assets/forecast.png")
    strFile1 = "C:/Users/DELL/forecasting/src/assets/forecast.png"
    if os.path.isfile(strFile1):
     os.remove(strFile1)  
    plt.savefig(strFile1)
    plt.clf()
    plt.cla()
    plt.close()
    forecast.to_csv('forecast.csv',index_label='Date')
    return jsonify(data)
# process()
if __name__=="__main__":
  app.run(debug=True)
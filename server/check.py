import sys
import json
import numpy as np
import pandas as pd
from Bio_Epidemiology_NER.bio_recognizer import ner_prediction
import pdb
pd.set_option('display.max_colwidth', 20)

pa = sys.argv[4]
doc = f"""
	CASE: {pa}
      """

analysed = ner_prediction(corpus=doc, compute='cpu')
# pdb.set_trace()

if(analysed.shape == (0,0)):
    print("Cannot analyse your status: Please be more specific!")
    sys.exit("args: {}".format(analysed.shape))
    
analysed_filtered_DPBS = analysed[(analysed["entity_group"]=="Diagnostic_procedure") | (analysed["entity_group"]=="Biological_structure")]
analysed_filtered_SSLV = analysed[(analysed["entity_group"]=="Sign_symptom") | (analysed["entity_group"]=="Lab_value")]

# These will be the datasets to be used!
sup_1 = pd.read_csv("LabelStatements_1.csv", engine='python')
sup_2 = pd.read_csv("LabelStatements_2.csv", engine="python")
# sup_3 = pd.read_csv("LabelStatements_3.csv", engine="python")
# sup_4 = pd.read_csv("LabelStatements_4.csv", engine="python")
# sup_5 = pd.read_csv("LabelStatements_5.csv", engine="python")
prover_1 = pd.read_csv("ProductOverview_1.csv", engine="python")
prover_2 = pd.read_csv("ProductOverview_2.csv", engine="python")
# prover_3 = pd.read_csv("ProductOverview_3.csv", engine="python")
# prover_4 = pd.read_csv("ProductOverview_4.csv", engine="python")
# prover_5 = pd.read_csv("ProductOverview_5.csv", engine="python")

sup_frame = [sup_1,sup_2]# ,sup_3,sup_4,sup_5]
prover_frame = [prover_1, prover_2]# , prover_3, prover_4, prover_5]

sup_merged = pd.concat(sup_frame, ignore_index=True, sort=False)
prover_merged = pd.concat(prover_frame, ignore_index=True, sort=False)
sup_merged = sup_merged[sup_merged["Statement Type"]=="Other"]

# pdb.set_trace()
full_merged = pd.merge(prover_merged, sup_merged, how="right", on=["URL", "DSLD ID","Product Name"])
# filter_full_other.fillna("Others")
analysed_df = pd.DataFrame()
for index, row in analysed_filtered_DPBS.iterrows():
    # print(row)
    # filter_full_other_analyzed = filter_full_other[filter_full_other["Statement"].str.contains(row['Diagnostic_procedure'])]
    analysed_df=pd.concat([analysed_df, full_merged[full_merged["Statement"].str.contains(row['value'],na=False)]])


# Age Detection : (6 or younger => Supplement Form should be either Powder, Liquid, Gummy or Jelly
#                 (7 or older   => Any kind)

if(analysed_df.shape == (0,0)):
        print("No suppliments available that satisfies your requirements")
        sys.exit("Bailing out of the program.")

# if(int(sys.argv[1]) <= 6):
if not sys.argv[1]:
    d = {'Supplement Form [LanguaL]': ['Powder', 'Liquid', 'Gummy or Jelly']}
    child_rec = pd.DataFrame(data=d)

    new_df = pd.DataFrame()
    analysed_df_copy = analysed_df.copy()
    for index, row in child_rec.iterrows():
        new_df = pd.concat([new_df,analysed_df[analysed_df["Supplement Form [LanguaL]"].str.contains(row['Supplement Form [LanguaL]'],case=False)]])
    for index, row in new_df.iterrows():
        analysed_df_copy = analysed_df_copy.drop(index,axis=0)
    
    analysed_df = pd.concat([new_df,analysed_df_copy],axis=0)

    
# Brand preferrence : (not Nan => priority on that Brand)
#                     (Nan => Any kind)

# if("vega" != 'Nan'):
if(sys.argv[2] != 'Nan'):
    age_flag = False
    d = {'Brand Name': ['vega']}
    brand_rec = pd.DataFrame(data=d)

    new_df = pd.DataFrame()
    analysed_df_copy = analysed_df.copy()
    for index, row in brand_rec.iterrows():
        new_df = pd.concat([new_df,analysed_df[analysed_df["Brand Name"].str.contains(row['Brand Name'],case=False)]])
    
    # pdb.set_trace()
    if(5 <= 6):
        age_flag = True
        d = {'Supplement Form [LanguaL]': ['Liquid', 'Powder', 'Gummy or Jelly']}
        child_rec = pd.DataFrame(data=d)

        new_df_2 = pd.DataFrame()
        for index, row in child_rec.iterrows():
            new_df_2 = pd.concat([new_df_2,new_df[new_df["Supplement Form [LanguaL]"].str.contains(row['Supplement Form [LanguaL]'],case=False)]])

    
    if(age_flag):
        for index, row in new_df_2.iterrows():
            analysed_df_copy = analysed_df_copy.drop(index,axis=0)
        analysed_df = pd.concat([new_df_2,analysed_df_copy],axis=0)
    else:
        for index, row in new_df.iterrows():
            analysed_df_copy = analysed_df_copy.drop(index,axis=0)
        analysed_df = pd.concat([new_df,analysed_df_copy],axis=0)


if(sys.argv[3]):
    d = {'Market Status': ['On Market']}
    on_rec = pd.DataFrame(data=d)
    new_df = pd.DataFrame()
    # analysed_df_copy = analysed_df.copy()
    for index, row in on_rec.iterrows():
        new_df = pd.concat([new_df,analysed_df[analysed_df["Market Status"].str.contains(row['Market Status'],case=False)]])
    analysed_df = new_df  
    

# analysed_df.to_json(r'./output.json')
result = analysed_df.to_json(orient="split")
parsed = json.loads(result)
print(json.dumps(parsed, indent=4))

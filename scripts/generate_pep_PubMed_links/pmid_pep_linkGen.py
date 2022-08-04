import pandas as pd
import json

df = pd.read_csv("pep_pmid_file_Jun2022.csv")

pep_ids = list(set(list(df['PepID'])))
links = {} 

for pep_id in pep_ids:
    links['pep' + str(pep_id)] = []

for idx,row in df.iterrows():
    links['pep' + str(row['PepID'])].append(row['PMID'])


with open("pep_pubmed_mapping.json","w+") as j_handle:
    j_handle.write("pep_to_links = '" + json.dumps(links) + "';")

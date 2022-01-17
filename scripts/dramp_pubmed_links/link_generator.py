import pandas as pd
import numpy as np
import json


#Generating the PubMed links and dropping unrelated columns 
cleaned_data = pd.read_csv("query_DB.csv")
links = []
for i in range(len(cleaned_data)):
    x = cleaned_data['Query'][i]
    try:
        x = x.replace('\n',' ').replace(' ','+').replace("\"",'')
    except:
        print (i,x)
        break
    links.append("https://pubmed.ncbi.nlm.nih.gov/?term="+x)

del cleaned_data['Query']
del cleaned_data['Peptide Name']
cleaned_data['Links'] = links


#Generating the JSON file with the mappings
dic = dict(zip(["pep"+str(pepid) for pepid in cleaned_data['PepID']],cleaned_data['Links']))
file = open("../../static/js/query_links_mapping.json","w")
file.write("pep_to_links = '")
json.dump(dic,file)
file.write("'")
file.close()

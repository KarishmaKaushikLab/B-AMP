"""
Title : API Script for retrieving biofilm related literature for B-AMP peptides
Author : Yatindrapravanan Narasimhan, Ragothaman M. Yennamalli
Date : 15 Oct 2021
"""
import csv
import re
import urllib.request
from time import sleep
from requests_html import HTMLSession

# Part A - Reading the file and processing the peptide names
with open("biofilm_1324_hits.txt") as file:
    names = file.readlines()
names = [i.strip() for i in sorted(names)]
file.close()
l, f_l = [], []
for i in names:
    l.append(re.findall("\(.*\)", i))
for i in l:
    if len(i):
        j = i[0].split(") (")
        if len(j) > 1:
            f_l.append("(" + j[-1])
        else:
            f_l.append(j[-1])
    else:
        f_l.append("NONE")
final_list = []
j = 0
for i in names:
    if f_l[j] != "NONE":
        final_list.append(i.replace(f_l[j], "").strip())
    else:
        final_list.append(i.strip())
    j += 1
with open("spl-1324.txt") as file:
    ip = file.readlines()
for i in ip:
    names.append(i.strip())
    final_list.append(i.strip())
names = sorted(names)
final_list = sorted(final_list)
file.close()
file = open("biofilm-pu.csv", "w", encoding='utf-8')
fields = ["AMP_Names", "Pubmed_Ids", "Total_Abstract_Count", "Abstract(s)"]
writer = csv.writer(file)
writer.writerow(fields)

count = 960

# Part B - Getting the abstracts, count, and PubMed IDs of the peptides
print(final_list[961])
for i in final_list[960:]:
    query = f'({i.replace(" ", "%20")})%20AND%20(biofilm)'
    count += 1
    print(f"Query {count}:")

    # common settings for esearch and efetch
    base_url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
    db = 'db=pubmed'

    # esearch specific settings
    search_eutil = 'esearch.fcgi?'
    search_term = '&term=' + query
    search_usehistory = '&usehistory=y'
    search_rettype = '&rettype=xml'
    search_retmax = '&retmax=10000'

    search_url = base_url + search_eutil + db + search_term + search_usehistory + search_rettype + search_retmax
    print(search_url)

    f = urllib.request.urlopen(search_url)
    search_data = f.read().decode('utf-8')
    res = HTMLSession().get(search_url)
    Id = res.html.find("Id")
    Ids = [a.text for a in Id]

    # Getting the total abstract count
    total_abstract_count = int(re.findall("<Count>(\d+?)</Count>", search_data)[0])
    print(total_abstract_count)

    # Getting webenv and querykey settings for efetch command
    fetch_webenv = "&WebEnv=" + re.findall("<WebEnv>(\S+)<\/WebEnv>", search_data)[0]
    fetch_querykey = "&query_key=" + re.findall("<QueryKey>(\d+?)</QueryKey>", search_data)[0]

    # efetch specific settings
    fetch_eutil = 'efetch.fcgi?'
    retmax = 1000
    retstart = 0
    fetch_retstart = "&retstart=" + str(retstart)
    fetch_retmax = "&retmax=" + str(retmax)
    fetch_retmode = "&retmode=text"
    fetch_rettype = "&rettype=abstract"

    # Calling efetch commands using a loop until all abstracts are obtained
    run = True
    all_abstracts = list()
    loop_counter = 1
    if len(Ids):
        while run:
            print("this is efetch run number " + str(loop_counter))
            loop_counter += 1
            fetch_retstart = "&retstart=" + str(retstart)
            fetch_retmax = "&retmax=" + str(retmax)
            # creating the efetch url
            fetch_url = base_url + fetch_eutil + db + fetch_querykey + fetch_webenv + fetch_retstart + fetch_retmax + fetch_retmode + fetch_rettype
            # print(fetch_url)
            f = urllib.request.urlopen(fetch_url)
            fetch_data = f.read().decode('utf-8')
            # splitting the data into individual abstracts and appending to all_abstracts
            abstracts = fetch_data.split("\n\n\n")
            all_abstracts = all_abstracts + abstracts
            print("a total of " + str(len(all_abstracts)) + " abstracts have been downloaded.\n")
            # waiting 2 seconds to not get blocked
            sleep(2)
            # updating the retstart to download the next set of abstracts
            retstart = retstart + retmax
            if retstart > total_abstract_count:
                run = False
        Ids = '\n'.join(Ids)
        all_abstracts = '\n\n\n'.join(all_abstracts)
    else:
        all_abstracts = 'NA'
        Ids = 'NA'
    writer.writerow([names[final_list.index(i)], Ids, total_abstract_count, all_abstracts])

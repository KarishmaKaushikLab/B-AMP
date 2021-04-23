from csv import DictReader
import json


def build_dramp_to_pep_index():
    INDEX = {}

    with open("index/full.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        pep_id = 2
        for row in reader:
            dramp_id = row["DRAMP_ID"]
            dramp_id_numeric = int(dramp_id[5:])
            INDEX[dramp_id_numeric] = pep_id

            pep_id += 1


    with open("static/js/dramp_to_pep_index.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        contents = f"const DRAMP_TO_PEP = {index_str};"
        index_fd.write(contents)


def build_pep_to_dramp_index():
    INDEX = {}

    with open("index/full.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        pep_id = 2
        for row in reader:
            dramp_id = row["DRAMP_ID"]
            dramp_id_numeric = int(dramp_id[5:])
            INDEX[pep_id] = dramp_id_numeric

            pep_id += 1


    with open("static/js/pep_to_dramp.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        contents = f"const PEP_TO_DRAMP = {index_str};"
        index_fd.write(contents)


def build_pep_to_activity_index():
    INDEX = {}

    ACTIVITY_TO_ID = {
        "Antibacterial": 1,
        "Anti-Gram+": 2,
        "Anti-Gram-": 3,
        "Antimicrobial": 4,
    }

    with open("index/full.csv") as csv_fd:
        reader = DictReader(csv_fd)

        aset = set()
        
        pep_id = 2
        for row in reader:
            activities = []
            str_activities = row["Activity"].split(",")
            for str_activity in str_activities:
                str_activity = str_activity.strip()
                if str_activity:
                    if not ACTIVITY_TO_ID.get(str_activity):
                        aset.add(str_activity)
                        continue

                    activities.append(ACTIVITY_TO_ID[str_activity])
            

            INDEX[pep_id] = activities

            pep_id += 1


    with open("static/js/pep_to_activity_index.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        contents = f"const PEP_TO_ACTIVITY = {index_str};"
        index_fd.write(contents)
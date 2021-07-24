from csv import DictReader
import json


def build_dramp_to_pep_index():
    INDEX = {}

    with open("utils/full.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        pep_id = 2
        for row in reader:
            dramp_id = row["DRAMP_ID"][5:]
            INDEX[dramp_id] = pep_id

            pep_id += 1


    with open("static/js/dramp_to_pep_index.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        index_str = json.dumps(index_str)   # for escaping double quotes
        contents = f"const DRAMP_TO_PEP = JSON.parse({index_str});"
        index_fd.write(contents)


def build_pep_to_dramp_index():
    INDEX = {}

    with open("utils/full.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        pep_id = 2
        for row in reader:
            dramp_id = row["DRAMP_ID"][5:]
            INDEX[pep_id] = dramp_id

            pep_id += 1


    with open("static/js/pep_to_dramp.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        index_str = json.dumps(index_str)   # for escaping double quotes
        contents = f"const PEP_TO_DRAMP = JSON.parse({index_str});"
        index_fd.write(contents)


def build_pep_to_activity_and_name_index():
    INDEX = {}

    ACTIVITY_TO_ID = {
        "Anti-Gram+": 1,
        "Anti-Gram-": 2,
    }

    with open("utils/full.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        pep_id = 2
        for row in reader:
            activities = 0
            str_activities = row["Activity"].split(",")
            for str_activity in str_activities:
                str_activity = str_activity.strip()
                if str_activity:
                    if not ACTIVITY_TO_ID.get(str_activity):
                        continue

                    activities += ACTIVITY_TO_ID[str_activity]
            

            INDEX[pep_id] = [activities, row["Name"]]
            pep_id += 1


    with open("static/js/pep_to_activity_and_name_index.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        index_str = json.dumps(index_str)   # for escaping double quotes
        contents = f"const PEP_TO_ACTIVITY_AND_NAME = JSON.parse({index_str});"
        index_fd.write(contents)


def build_pep_to_docking_score_index():
    INDEX = {}

    with open("utils/docked.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        for row in reader:
            INDEX[row["Peptide#"]] = row["Docking Score"]


    with open("static/js/pep_to_docking_score_index.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        index_str = json.dumps(index_str)   # for escaping double quotes
        contents = f"const PEP_TO_DOCKING_SCORE = JSON.parse({index_str});"
        index_fd.write(contents)


def build_text_to_pep_index():
    from collections import defaultdict
    import re

    INDEX = defaultdict(list)

    with open("utils/full.csv") as csv_fd:
        reader = DictReader(csv_fd)
        
        pep_id = 2
        for row in reader:
            name = row["Name"].lower()
            tokens = name.split(sep=" ")

            for token in tokens:
                token = re.sub(r"\W+", "", token)
                INDEX[token].append(pep_id)

            pep_id += 1


    with open("static/js/text_to_pep.js", "w+") as index_fd:
        index_str = json.dumps(INDEX)
        index_str = json.dumps(index_str)   # for escaping double quotes
        contents = f"const TEXT_TO_PEP = JSON.parse({index_str});"
        index_fd.write(contents)

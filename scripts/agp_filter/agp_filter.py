from csv import DictReader

with open("../../utils/full.csv") as file:
    reader = DictReader(file)

    i = 2
    for row in reader:
        activity = row["Activity"]
        if "Anti-Gram+" in activity:           		
                print(f"Pep{i}")

        i = i + 1

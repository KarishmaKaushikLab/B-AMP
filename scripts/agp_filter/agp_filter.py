from csv import DictReader
from os import path, mkdir

with open("../../utils/full.csv") as file:
    reader = DictReader(file)

    if not path.isdir("AntiGramPositivePeptides"):
        mkdir("AntiGramPositivePeptides")

    i = 2
    for row in reader:
        activity = row["Activity"]
        if "Anti-Gram+" in activity:
            with open(f"AntiGramPositivePeptides/Pep{i}.fasta", "w+") as fasta_file:
                fasta_file.write(f">Peptide_{i}\n")
                fasta_file.write(row["Sequence"])
           		
                print(f"Pep{i}")

        i = i + 1

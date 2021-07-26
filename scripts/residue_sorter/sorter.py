"""
This script was used to sort the residues in our docked peptides
according to a priority based on that of that residue's interactions.
This makes for better readability.
"""

import pandas as pd

RESIDUE_TO_PRIORITY = {
    "HIS168": 1,
    "ARG239": 2,
    "ASN236": 3,
    "GLN143": 4,
    "ASP139": 5,
    "THR137": 6,
    "ALA95": 7,
    "LEU96": 8,
    "PRO94": 9,
    "THR169": 10,
    "GLY170": 11,
    "ILE235": 12,
    "ARG98": 13,
    "TYR233": 14,
    "ALA172": 15,
    "THR237": 16,
    "GLY234": 17,
    "ASP140": 18,
    "THR231": 19,
}

PRIORITY_TO_RESIDUE = [*RESIDUE_TO_PRIORITY.keys()]


def sort_residues(residues_str: str) -> str:
    residues_list = residues_str.split(",")
    residues_as_priorities = []

    for residue in residues_list:
        residue = residue.strip()

        if residue == "NO H-BONDS":
            continue

        priority = RESIDUE_TO_PRIORITY.get(residue)
        if priority:
            residues_as_priorities.append(priority)

    residues_as_priorities.sort()

    sorted_residues = [
        PRIORITY_TO_RESIDUE[priority - 1] for priority in residues_as_priorities
    ]

    sorted_residues_as_str = ""

    for index, residue in enumerate(sorted_residues):
        sorted_residues_as_str += residue

        if not index == len(sorted_residues) - 1:
            sorted_residues_as_str += ","

    return sorted_residues_as_str


df = pd.read_csv("docked.csv")

# For each row
# Parse residues by splitting up based on commas
# Replace each residue with its priority
# Sort array based on priority
# Replace each priority with residue name
# Add array back into DF

df["Interacting Residues"] = df["Interacting Residues"].apply(sort_residues)
print(df["Interacting Residues"])

df.to_csv("sorted_residues.csv", index=False)

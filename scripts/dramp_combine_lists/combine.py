"""
Usage:
python3 combine.py <old_file> <new_file>

This will generate a new combined CSV called combined.csv
"""

from csv import DictReader, DictWriter
import argparse

arg_parser = argparse.ArgumentParser("Combine old and new DRAMP lists")
arg_parser.add_argument('old_csv', type=str, help='Path to old CSV file')
arg_parser.add_argument('new_csv', type=str, help='Path to new CSV file')

args = arg_parser.parse_args()

original_reader = DictReader(open(args.old_csv), delimiter=',')
revised_reader = DictReader(open(args.new_csv), delimiter=',')

DRAMP_TO_ORIGINAL_INDEX = dict()

for index, row in enumerate(original_reader):
    DRAMP_TO_ORIGINAL_INDEX[row["DRAMP_ID"]] = index

new_peps = []

for row in revised_reader:
    target_index = DRAMP_TO_ORIGINAL_INDEX.get(row["DRAMP_ID"])

    if not target_index:
        new_peps.append(row)

print(f"{len(new_peps)} new peptides found.")

original_reader = DictReader(open(args.old_csv))
original_list = list(original_reader)

final_list = original_list + new_peps

COMBINED_CSV_NAME = "combined.csv"

with open(COMBINED_CSV_NAME, "w+") as fd:
    writer = DictWriter(fd, fieldnames=["DRAMP_ID","Sequence","Sequence_Length","Name","Swiss_Prot_Entry","Family","Gene","Source","Activity","Protein_existence","Structure","Structure_Description","PDB_ID","Comments","Target_Organism","Hemolytic_activity","Binding_Target","Pubmed_ID","Reference","Author","Title", 'Linear/Cyclic/Branched', 'Stereochemistry', 'N-terminal_Modification', 'Cytotoxicity', 'C-terminal_Modification', 'Other_Modifications', 'Binding_Traget'], extrasaction='ignore')
    writer.writeheader()
    writer.writerows(final_list)

    print(f"Combined csv written to {COMBINED_CSV_NAME}.")

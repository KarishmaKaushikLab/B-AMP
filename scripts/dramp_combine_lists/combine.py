from csv import DictReader, DictWriter

original_reader = DictReader(open("original.csv"), delimiter=',')
revised_reader = DictReader(open("revised.csv"), delimiter=',')

DRAMP_TO_ORIGINAL_INDEX = dict()

for index, row in enumerate(original_reader):
    DRAMP_TO_ORIGINAL_INDEX[row["DRAMP_ID"]] = index

new_peps = []

for row in revised_reader:
    target_index = DRAMP_TO_ORIGINAL_INDEX.get(row["DRAMP_ID"])

    if not target_index:
        new_peps.append(row)


original_reader = DictReader(open("original.csv"))
original_list = list(original_reader)

final_list = original_list + new_peps


with open("final.csv", "w+") as fd:
    writer = DictWriter(fd, fieldnames=["DRAMP_ID","Sequence","Sequence_Length","Name","Swiss_Prot_Entry","Family","Gene","Source","Activity","Protein_existence","Structure","Structure_Description","PDB_ID","Comments","Target_Organism","Hemolytic_activity","Binding_Target","Pubmed_ID","Reference","Author","Title", 'Linear/Cyclic/Branched', 'Stereochemistry', 'N-terminal_Modification', 'Cytotoxicity', 'C-terminal_Modification', 'Other_Modifications', 'Binding_Traget'], extrasaction='ignore')
    writer.writeheader()
    writer.writerows(final_list)
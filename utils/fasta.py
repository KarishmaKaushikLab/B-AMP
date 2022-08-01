from csv import DictReader
from os import mkdir, path


def generate_fasta_files():
    with open("utils/full.csv") as fd:
        reader = DictReader(fd)

        if not path.isdir("static/peptides/fasta"):
            mkdir("static/peptides/fasta")

        for row in reader:
            pep_id = int(row["PepID"])
            
            if pep_id in (0, 1):
                # These are hardcoded, skip
                continue

            with open(f"static/peptides/fasta/Pep{pep_id}.fasta", "w+") as fasta_file:
                fasta_file.write(f">Peptide_{pep_id}\n")
                fasta_file.write(row["Sequence"])
                print(f"FASTA generated: Pep{pep_id}.fasta")

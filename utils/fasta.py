from csv import DictReader
from os import mkdir, path


def generate_fasta_files():
    with open("utils/full.csv") as fd:
        reader = DictReader(fd)

        if not path.isdir("static/peptides/fasta"):
            mkdir("static/peptides/fasta")

        i = 2
        for row in reader:
            with open(f"static/peptides/fasta/Pep{i}.fasta", "w+") as fasta_file:
                fasta_file.write(f">Peptide_{i}\n")
                fasta_file.write(row["Sequence"])
                print(f"FASTA generated: Pep{i}.fasta")

            i = i + 1

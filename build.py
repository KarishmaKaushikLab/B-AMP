from utils import fasta, index, thumbs
from sys import argv, exit


if __name__ == "__main__":
    if len(argv) < 2:
        print("Missing arguments: index/thumbs/fasta/all")
        exit(1)

    for arg in argv[1:]:
        if arg not in ("all", "index", "thumbs", "fasta"):
            print(f"Unknown target: {arg}")
            exit(1)

    if "all" in argv or "index" in argv:
        index.build_dramp_to_pep_index()
        index.build_pep_to_dramp_index()
        index.build_pep_to_activity_and_name_index()
        index.build_pep_to_docking_score_index()
        index.build_text_to_pep_index()

    if "all" in argv or "thumbs" in argv:
        thumbs.generate_thumbnails()
        thumbs.generate_docked_thumbnails()
        thumbs.generate_sortase_thumbnail()

    if "all" in argv or "fasta" in argv:
        fasta.generate_fasta_files()

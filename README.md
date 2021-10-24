# Antimicrobial Peptide Repository for Biofilms

Check out our [website](https://b-amp.karishmakaushiklab.com/).

<center>

![Project Logo](static/images/AMPDB.svg)

</center>

B-AMP is an Antimicrobial Peptide (AMP) repository for biofilms, consisting of a vast library of 5544 structural AMP models, AMPs annotated to relevant biofilm literature, and protein-peptide interaction models with potential biofilm targets. B-AMP provides search enabled information of AMP structures, that includes easily accessible and downloadable FASTA files, PDB structures and their pictorial representation in 3D space. It also includes a filtered library of 2534 filtered peptides known to exhibit anti-Gram positive activity. Taken together, this user-friendly repository and structural and functional library can serve as a bioinformatics resource for AMP investigations across other biofilm targets and biofilm-forming pathogens.

---

Our [GitHub repository](https://github.com/KarishmaKaushikLab/B-AMP) is home to everything that goes into our website: the code for the website itself, the Python scripts that helped us throughout the project and all the downloadable assets and resources. It's all open-source and is licensed under a Creative Commons Attribution 3.0 Unported License, with the exception of the website's code and additional utility code that aided this work, which is separately licensed under the GNU General Public License v3.0.

---

## Structure and Where's What

- `scripts/` houses all Python scripts that helped us automate some of our work and juggle around data. Learn more [here](https://b-amp.karishmakaushiklab.com/code.html).

- `static/` contains all the static assets and resource files such as images, FASTAs, PDBs and our website's CSS and JavaScript. Learn more [here](https://b-amp.karishmakaushiklab.com/code.html).

- `utils/` contains our master spreadsheet and Python scripts that utilize it to build our website and files required for it to function.

- The root directory of this Git repository contains all the HTML pages that make up [our website](https://b-amp.karishmakaushiklab.com/). It also includes a `build.py` file which triggers the Python scripts from the aforementioned `utils/` directory.

---

## Building the Website

In the event of changes to the [master spreadsheet](https://github.com/KarishmaKaushikLab/B-AMP/blob/master/utils/full.csv), the website must be rebuilt. This will rebuild all the thumbnails, search indexes and FASTA files. We use a simple Python script for this.

Simply run:
```bash
python3 build.py all
```

Optionally, if you wish to rebuild only a subset of these:
```bash
python3 build.py thumbs
python3 build.py index
python3 build.py fasta
python3 build.py thumbs index

.. or whatever combination you desire!
```
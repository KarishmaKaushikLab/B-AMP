import os

pdb_files = os.listdir('.\\peps_to_dock')
pdbqt_files = os.listdir('.\\pdbqt_files')

pdb_files = [pdb_file[0:-4] for pdb_file in pdb_files]
pdbqt_files = [pdbqt_file[0:-6] for pdbqt_file in pdbqt_files]

fails = list(set(pdb_files) - set(pdbqt_files))

print (fails)
